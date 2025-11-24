import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('/api/cart').then(res => setItems(res.data));
  }, []);
  const checkout = () => axios.post('/api/orders').then(() => alert('Order placed'));
  return (
    <div>
      <h2>Your Cart</h2>
      {items.map(i => (
        <div key={i.id} style={{display:'flex', justifyContent:'space-between'}}>
          <span>{i.productName}</span>
          <span>Qty: {i.qty}</span>
          <span>₹{i.price * i.qty}</span>
        </div>
      ))}
      <button onClick={checkout} disabled={!items.length}>Checkout</button>
    </div>
  );
}
