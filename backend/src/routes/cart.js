const express = require('express');
const auth = require('../middleware/auth');
const pool = require('../db');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const [rows] = await pool.query(
    `SELECT c.id, p.name as productName, c.qty, p.price
     FROM cart c JOIN products p ON c.productId=p.id WHERE c.userId=?`,
    [req.user.uid]
  );
  res.json(rows);
});

router.post('/', auth, async (req, res) => {
  const { productId, qty } = req.body;
  await pool.query('INSERT INTO cart(userId, productId, qty) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE qty=qty+VALUES(qty)',
    [req.user.uid, productId, qty || 1]);
  res.status(201).json({ message: 'Added' });
});

module.exports = router;
