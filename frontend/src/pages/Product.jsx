import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => setP(res.data));
  }, [id]);

  const addToCart = () => axios.post('/api/cart', { productId: id, qty: 1 });

  if (!p) return <div>Loading...</div>;
  return (
    <div>
      <h2>{p.name}</h2>
      <img alt={p.name} src={p.imageUrl} style={{width:'400px'}} />
      <p>{p.description}</p>
      <p><b>Price:</b> ₹{p.price}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
