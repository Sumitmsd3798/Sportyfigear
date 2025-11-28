const express = require('express');
const auth = require('../middleware/auth');
const pool = require('../db');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [items] = await conn.query(
      `SELECT c.productId, c.qty, p.price FROM cart c JOIN products p ON c.productId=p.id WHERE c.userId=?`,
      [req.user.uid]
    );
    if (!items.length) return res.status(400).json({ error: 'Cart empty' });

    const [orderRes] = await conn.query('INSERT INTO orders(userId, status) VALUES(?, ?)', [req.user.uid, 'PLACED']);
    const orderId = orderRes.insertId;

    for (const i of items) {
      await conn.query('INSERT INTO order_items(orderId, productId, qty, price) VALUES(?, ?, ?, ?)',
        [orderId, i.productId, i.qty, i.price]);
    }
    await conn.query('DELETE FROM cart WHERE userId=?', [req.user.uid]);

    await conn.commit();
    res.status(201).json({ orderId, status: 'PLACED' });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: 'Order failed' });
  } finally {
    conn.release();
  }
});

module.exports = router;
