const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    unique: true,
    enum: ['E3', 'E4', 'E5']
  },
  name: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  ramUpgrade: {
    type: Number,
    default: 3000,
    min: 0
  },
  ssdUpgrade: {
    type: Number,
    default: 4000,
    min: 0
  },
  warrantyUpgrade: {
    type: Number,
    default: 1000,
    min: 0
  },
  images: [{
    type: String
  }],
  description: {
    type: String
  },
  specifications: {
    type: mongoose.Schema.Types.Mixed
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  category: {
    type: String,
    default: 'Laptops'
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes
productSchema.index({ stock: 1 });
// model is already indexed as unique: true in schema definition

module.exports = mongoose.model('Product', productSchema); 