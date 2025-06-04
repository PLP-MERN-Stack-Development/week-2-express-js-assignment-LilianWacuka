require('dotenv').config(); 

// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./product');
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Initialize Express app
const app = express();
app.get ('/', (req, res)=> {
    res.send ('Helllo World!');
});

//7logger middleware
app.use((req, res,next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
})
// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() =>console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDb connection error:', err))

app.listen (PORT, () =>{
    console.log (`Server is running on http://localhost:${PORT}`);
});

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});
//API ROUTES

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Use routes from routes.js
const productRoutes = require('./routes');
app.use('/api', productRoutes);
// // Example route implementation for GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling
// Authenication middleware
app.use((req, res, next) =>{
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY){
    next();
  }else {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
});
// Start the server
// app.listen (PORT, () =>{
//     console.log (`Server is running on http://localhost:${PORT}`);
// });

// Export the app for testing purposes
module.exports = app;