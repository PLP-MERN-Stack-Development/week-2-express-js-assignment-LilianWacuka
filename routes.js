const express = require('express');
const router = express.Router();
const Product = require('./product');
const Mongoose = require('mongoose');

// Validation middleware for product creation and update
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name !== 'string' || !name.trim() ||
    typeof description !== 'string' || !description.trim() ||
    typeof price !== 'number' ||
    typeof category !== 'string' || !category.trim() ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ message: 'Invalid product data' });
  }
  next();
}

// GET /api/products/search?name=searchTerm - Search products by name
router.get('/products/search', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }
    const products = await Product.find({
      name: { $regex: name, $options: 'i' } 
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/products/stats - Get product count by category
router.get('/products/stats', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/products/:id - Get a specific product
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/products - Get all products
router.get('/products', async (req, res) => {
        const products = await Product.find();
        res.status(200).json(products);
    
});

// GET /api/products - Get all products with optional filtering by category
router.get('/products', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST /api/products - Create a new product
router.post('/products', validateProduct, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// PUT /api/products/:id - Update a specific product
router.put('/products/:id', validateProduct, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        if (!updated) return res.status(404).json({ message: 'Not Found'});
        res.status(200).json(updated);
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// DELETE /api/products/:id - Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json(deleted);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
});



module.exports = router;