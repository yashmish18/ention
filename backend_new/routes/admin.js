const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'business@ention.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EntionAdmin2024!';

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Admin login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin: { email, role: 'admin' }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify admin token
router.get('/verify', isAdmin, (req, res) => {
  res.json({
    message: 'Admin token verified',
    admin: req.admin
  });
});

// Get all products
router.get('/products', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ model: 1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get low stock products
router.get('/low-stock', isAdmin, async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ["$stock", "$lowStockThreshold"] }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
});

// Get a specific product
router.get('/products/:model', isAdmin, async (req, res) => {
  try {
    const { model } = req.params;
    const product = await Product.findOne({ model: model.toUpperCase() });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create a new product
router.post('/products', isAdmin, async (req, res) => {
  try {
    const productData = req.body;

    // Check if product already exists
    const existingProduct = await Product.findOne({ model: productData.model });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this model already exists' });
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update a product
router.put('/products/:model', isAdmin, async (req, res) => {
  try {
    const { model } = req.params;
    const updateData = req.body;

    const product = await Product.findOneAndUpdate(
      { model: model.toUpperCase() },
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
router.delete('/products/:model', isAdmin, async (req, res) => {
  try {
    const { model } = req.params;

    const product = await Product.findOneAndDelete({ model: model.toUpperCase() });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Initialize default products (run this once to set up initial data)
router.post('/products/initialize', isAdmin, async (req, res) => {
  try {
    const defaultProducts = [
      {
        model: 'E3',
        name: 'ENTION Laptop E3',
        basePrice: 28000,
        ramUpgrade: 3000,
        ssdUpgrade: 4000,
        warrantyUpgrade: 1000,
        images: ['/assets/product_/e3/cover-img.webp'],
        description: 'ENTION Laptop E3 - Perfect for everyday computing',
        specifications: {
          processor: 'Intel N95',
          ram: '8GB DDR4',
          storage: '512GB SSD',
          display: '15.6" Full HD',
          os: 'Windows 11 Pro'
        },
        stock: 100,
        category: 'Laptops'
      },
      {
        model: 'E4',
        name: 'ENTION Laptop E4',
        basePrice: 28000,
        ramUpgrade: 3000,
        ssdUpgrade: 4000,
        warrantyUpgrade: 1000,
        images: ['/assets/product_/e4/cover-img.webp'],
        description: 'ENTION Laptop E4 - Enhanced performance for professionals',
        specifications: {
          processor: 'Intel N95',
          ram: '8GB DDR4',
          storage: '512GB SSD',
          display: '15.6" Full HD',
          os: 'Windows 11 Pro'
        },
        stock: 100,
        category: 'Laptops'
      },
      {
        model: 'E5',
        name: 'ENTION Laptop E5',
        basePrice: 28000,
        ramUpgrade: 3000,
        ssdUpgrade: 4000,
        warrantyUpgrade: 1000,
        images: ['/assets/product_/e5/cover-img.webp'],
        description: 'ENTION Laptop E5 - Premium computing experience',
        specifications: {
          processor: 'Intel N95',
          ram: '8GB DDR4',
          storage: '512GB SSD',
          display: '15.6" Full HD',
          os: 'Windows 11 Pro'
        },
        stock: 100,
        category: 'Laptops'
      }
    ];

    for (const productData of defaultProducts) {
      const existingProduct = await Product.findOne({ model: productData.model });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
      }
    }

    const products = await Product.find().sort({ model: 1 });
    res.json({ message: 'Products initialized successfully', products });
  } catch (error) {
    console.error('Error initializing products:', error);
    res.status(500).json({ error: 'Failed to initialize products' });
  }
});

module.exports = router; 