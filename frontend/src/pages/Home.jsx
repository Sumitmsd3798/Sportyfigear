import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);
  return (
    <div>
      <h2>Sports Equipment</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
        {products.map(p => (
          <div key={p.id} style={{border:'1px solid #eee', padding:'10px'}}>
            <img alt={p.name} src={p.imageUrl} style={{width:'100%', height:'160px', objectFit:'cover'}} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <Link to={`/product/${p.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
