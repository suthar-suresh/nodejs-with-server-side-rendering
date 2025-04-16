const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const userRoutes = require('../routes/userRoutes'); // <-- updated path

require('dotenv').config();

const app = express();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views')); // <-- updated view path

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public'))); // <-- updated public path

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Routes
app.use('/', userRoutes);

// DB Connection (run once)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Export the app for Vercel
module.exports = app;
