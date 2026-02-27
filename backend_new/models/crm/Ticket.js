const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  issueDescription: {
    type: String,
    required: true
  },
  preferredContactTime: {
    type: String
  },
  status: {
    type: String,
    enum: [
      'Acknowledged',
      'Diagnosing',
      'In Progress',
      'Awaiting Approval',
      'Component Dispatched',
      'Resolved',
      'Closed'
    ],
    default: 'Acknowledged'
  },
  assignedTo: {
    type: String
  },
  warrantyStatus: {
    type: String,
    enum: ['Active', 'Expired', 'Pending Validation'],
    default: 'Pending Validation'
  },
  estimateAmount: {
    type: Number,
    default: 0
  },
  happyCode: {
    type: String
  },
  happyVerified: {
    type: Boolean,
    default: false
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

// Generate ticket ID and happy code
ticketSchema.pre('save', function (next) {
  if (!this.ticketId) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.ticketId = `TKT-${timestamp}-${random}`;
  }

  if (!this.happyCode) {
    this.happyCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  }

  this.updatedAt = new Date();
  next();
});

// Indexes
ticketSchema.index({ status: 1 });
ticketSchema.index({ createdAt: -1 });
// ticketId is already indexed as unique: true in schema definition

module.exports = mongoose.model('Ticket', ticketSchema);
