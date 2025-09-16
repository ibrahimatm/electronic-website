import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'http://localhost:3000';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'dummy-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DbProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  in_stock: boolean;
  rating: number;
  created_at?: string;
}

export interface DbCartItem {
  id: number;
  product_id: number;
  quantity: number;
  user_session: string;
  created_at: string;
  products?: DbProduct;
}

export interface DbOrder {
  id: number;
  user_session: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  created_at: string;
}

export interface DbOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
}

export interface DbBooking {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string;
  description: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface DbFeedback {
  id: number;
  customer_name: string;
  customer_email: string;
  message: string;
  rating?: number;
  created_at: string;
}
