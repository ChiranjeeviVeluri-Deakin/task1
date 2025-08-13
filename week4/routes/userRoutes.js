const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create user
router.post('/add', async (req, res) => {
  try {
    const doc = await User.create(req.body);
    res.json({ message: 'User added', user: doc });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List users
router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

module.exports = router;
