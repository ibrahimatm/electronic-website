import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from '../../contexts/CartContext';

const FiMenuIcon = FiMenu as unknown as React.FC<{ size?: number }>;
const FiXIcon = FiX as unknown as React.FC<{ size?: number }>;
const FiShoppingCartIcon = FiShoppingCart as unknown as React.FC<{ size?: number }>;

const Navbar = styled.nav`
  background: #000000;
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Menu = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ open }) => (open ? "0" : "-100%")};
    background: #000000;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: right 0.3s ease-in-out;
  }
`;

const MenuItem = styled.li`
  a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    &:hover {
      color: #dbbc07;
    }
  }
`;

const CartButton = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #dbbc07;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background: #c4a806;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
`;

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { state: cartState } = useCart();

  return (
    <Navbar>
      <Logo>⚡ElectroShop</Logo>
      
      <NavContent>
        <Menu open={open}>
          <MenuItem><Link to="/">Home</Link></MenuItem>
          <MenuItem><Link to="/products">Products</Link></MenuItem>
          <MenuItem><Link to="/booking">Book Service</Link></MenuItem>
          <MenuItem><Link to="/about">About</Link></MenuItem>
          <MenuItem><Link to="/contact">Contact</Link></MenuItem>
        </Menu>
        
        <CartButton to="/cart">
          <FiShoppingCartIcon size={20} />
          <span>Cart</span>
          {cartState.itemCount > 0 && (
            <CartBadge>{cartState.itemCount > 99 ? '99+' : cartState.itemCount}</CartBadge>
          )}
        </CartButton>
        
        <MenuToggle onClick={() => setOpen(!open)}>
          {open ? <FiXIcon size={28} /> : <FiMenuIcon size={28} />}
        </MenuToggle>
      </NavContent>
    </Navbar>
  );
};

export default Header;