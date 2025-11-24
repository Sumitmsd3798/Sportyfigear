require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const products = require('./routes/products');
const users = require('./routes/users');
const cart = require('./routes/cart');
const orders = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: rows[0].ok === 1 });
  } catch {
    res.status(500).json({ status: 'error' });
  }
});

app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/cart', cart);
app.use('/api/orders', orders);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend on ${port}`));
