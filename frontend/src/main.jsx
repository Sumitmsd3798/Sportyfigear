import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <header style={{padding:'10px', borderBottom:'1px solid #ddd'}}>
        <Link to="/">SportifyGear</Link>
        <nav style={{marginLeft:'20px'}}>
          <Link to="/cart">Cart</Link>
          <span style={{marginLeft:'10px'}}></span>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main style={{padding:'20px'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
