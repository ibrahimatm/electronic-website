export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  inStock: boolean;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject: string;
}