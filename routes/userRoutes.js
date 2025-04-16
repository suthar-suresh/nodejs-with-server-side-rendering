const express = require('express');
const router = express.Router();
const User = require('../models/user');

// List users
router.get('/', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.render('index', { users });
});

// New user form
router.get('/users/new', (req, res) => {
  res.render('edit', { user: {} });
});

// Create user
router.post('/users', async (req, res) => {
  await User.create(req.body);
  res.redirect('/');
});

// Edit user form
router.get('/users/:id/edit', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('edit', { user });
});

// Update user
router.put('/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
