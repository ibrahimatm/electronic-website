import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import Booking from './Pages/Booking/Booking';

function App() {
  return (
    <CartProvider>
      <Router>
        <GlobalStyles />
        <div className="App">
          <Header />
          <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/booking" element={<Booking />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;