import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "SmartPhone X Pro",
    price: 899.99,
    description: "Latest smartphone with advanced AI camera",
    image: "/images/phone-1.jpg",
    category: "smartphones",
    features: ["5G", "128GB Storage", "Triple Camera"],
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "UltraBook Laptop",
    price: 1299.99,
    description: "Thin and light laptop for professionals",
    image: "/images/laptop-1.jpg",
    category: "laptops",
    features: ["Intel i7", "16GB RAM", "512GB SSD"],
    inStock: true,
    rating: 4.8
  }
];