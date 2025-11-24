import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async e => {
    e.preventDefault();
    const { data } = await axios.post('/api/users/login', { email, password });
    localStorage.setItem('token', data.token);
    alert('Logged in');
  };
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
