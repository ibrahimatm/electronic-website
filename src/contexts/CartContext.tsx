import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Product, CartItem } from '../types';
import { supabase } from '../lib/supabaseClient';

// Generate or get user session ID
const getUserSession = (): string => {
  let sessionId = localStorage.getItem('user_session');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('user_session', sessionId);
  }
  return sessionId;
};

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
  error: string | null;
}

type CartAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_ITEMS':
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      return {
        ...state,
        items: action.payload,
        total,
        itemCount,
        loading: false,
        error: null
      };
    
    case 'ADD_ITEM':
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems: CartItem[];
      
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
        error: null
      };
    
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const updatedTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const updatedItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
        itemCount: updatedItemCount,
        error: null
      };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const filteredItemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: filteredItems,
        total: filteredTotal,
        itemCount: filteredItemCount,
        error: null
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        error: null
      };
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  checkout: (customerInfo: {
    name: string;
    email: string;
    phone: string;
  }) => Promise<{ success: boolean; orderId?: number; error?: string }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const userSession = getUserSession();

  // Load cart from localStorage on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('cart_items', JSON.stringify(state.items));
    } else {
      localStorage.removeItem('cart_items');
    }
  }, [state.items]);

  const loadCart = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // First try to load from localStorage
      const localCart = localStorage.getItem('cart_items');
      if (localCart) {
        const items = JSON.parse(localCart);
        dispatch({ type: 'SET_ITEMS', payload: items });
        return;
      }

      // Try to load from Supabase if available
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (*)
        `)
        .eq('user_session', userSession);

      if (error && !error.message.includes('relation "cart_items" does not exist')) {
        throw error;
      }

      if (data && data.length > 0) {
        const cartItems: CartItem[] = data.map(item => ({
          ...item.products,
          quantity: item.quantity
        }));
        dispatch({ type: 'SET_ITEMS', payload: cartItems });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: [] });
      }
    } catch (error) {
      console.warn('Failed to load cart from database, using local storage:', error);
      dispatch({ type: 'SET_ITEMS', payload: [] });
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    const cartItem: CartItem = { ...product, quantity };
    
    try {
      // Add to local state immediately
      dispatch({ type: 'ADD_ITEM', payload: cartItem });

      // Try to sync with Supabase
      const existingItem = state.items.find(item => item.id === product.id);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      await supabase
        .from('cart_items')
        .upsert({
          product_id: product.id,
          quantity: newQuantity,
          user_session: userSession
        });
    } catch (error) {
      console.warn('Failed to sync cart with database:', error);
      // Item still added to local state
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });

    try {
      await supabase
        .from('cart_items')
        .update({ quantity })
        .match({ product_id: productId, user_session: userSession });
    } catch (error) {
      console.warn('Failed to update quantity in database:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });

    try {
      await supabase
        .from('cart_items')
        .delete()
        .match({ product_id: productId, user_session: userSession });
    } catch (error) {
      console.warn('Failed to remove item from database:', error);
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });

    try {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_session', userSession);
    } catch (error) {
      console.warn('Failed to clear cart in database:', error);
    }
  };

  const checkout = async (customerInfo: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (state.items.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_session: userSession,
          total_amount: state.total,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = state.items.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart after successful order
      await clearCart();

      return { success: true, orderId: orderData.id };
    } catch (error) {
      console.error('Checkout failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Checkout failed' 
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loadCart,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
