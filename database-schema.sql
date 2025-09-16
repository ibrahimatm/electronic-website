-- Electronic Website Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security (RLS) by default
-- This schema creates tables for products, cart, orders, bookings, and feedback

-- Products table (stores your electronic products)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  category VARCHAR(100),
  features JSONB DEFAULT '[]'::jsonb,
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table (temporary storage before checkout)
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  user_session VARCHAR(255) NOT NULL, -- Session ID for anonymous users
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (completed purchases)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_session VARCHAR(255),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table (individual products in each order)
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL, -- Price at time of order
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table (electrician service bookings)
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  description TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  address TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback table (customer messages and reviews)
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample products (based on your existing data)
INSERT INTO products (name, price, description, image, category, features, in_stock, rating) VALUES
('SmartPhone X Pro', 899.99, 'Latest smartphone with advanced AI camera', '/images/phone-1.jpg', 'smartphones', '["5G", "128GB Storage", "Triple Camera"]', true, 4.5),
('UltraBook Laptop', 1299.99, 'Thin and light laptop for professionals', '/images/laptop-1.jpg', 'laptops', '["Intel i7", "16GB RAM", "512GB SSD"]', true, 4.8),
('Wireless Headphones', 199.99, 'Premium noise-canceling wireless headphones', '/images/headphones-1.jpg', 'audio', '["Bluetooth 5.0", "30hr Battery", "Noise Canceling"]', true, 4.6),
('Smart Watch', 299.99, 'Fitness tracker with heart rate monitor', '/images/watch-1.jpg', 'wearables', '["Heart Rate Monitor", "GPS", "Water Resistant"]', true, 4.4),
('Bluetooth Speaker', 89.99, 'Portable speaker with rich sound', '/images/speaker-1.jpg', 'audio', '["Bluetooth 5.0", "12hr Battery", "Waterproof"]', true, 4.3),
('Gaming Mouse', 79.99, 'High-precision gaming mouse with RGB', '/images/mouse-1.jpg', 'accessories', '["RGB Lighting", "12000 DPI", "Ergonomic Design"]', true, 4.7);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_cart_items_user_session ON cart_items(user_session);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_preferred_date ON bookings(preferred_date);

-- Enable Row Level Security (optional - for production)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- For now, we'll allow public access (you can restrict later)
-- Create policies for public access
-- CREATE POLICY "Allow public read access on products" ON products FOR SELECT TO public USING (true);
-- CREATE POLICY "Allow public insert on cart_items" ON cart_items FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Allow public read own cart_items" ON cart_items FOR SELECT TO public USING (true);
-- CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Allow public insert on bookings" ON bookings FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Allow public insert on feedback" ON feedback FOR INSERT TO public WITH CHECK (true);
