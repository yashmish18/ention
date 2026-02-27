const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const Order = require('../models/Order');
const delhiveryService = require('../lib/delhiveryService');
const razorpayService = require('../lib/razorpayService');

// Get addresses for a user
router.get('/addresses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

// Save a new address
router.post('/addresses', async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ error: 'Failed to save address' });
  }
});

// Update an address
router.put('/addresses/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findByIdAndUpdate(addressId, req.body, { new: true });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Failed to update address' });
  }
});

// Delete an address
router.delete('/addresses/:addressId', async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findByIdAndDelete(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Failed to delete address' });
  }
});

// Create a new order
router.post('/orders', async (req, res) => {
  try {
    let stockDecremented = false;
    let productModelTarget = req.body.product?.model?.toUpperCase();

    if (!productModelTarget) {
      return res.status(400).json({ error: 'Product model is required.' });
    }

    // ATOMIC stock decrement — prevents race conditions and overselling
    const updatedProduct = await Product.findOneAndUpdate(
      { model: productModelTarget, stock: { $gt: 0 } },
      { $inc: { stock: -1 } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ error: 'Product is currently out of stock.' });
    }

    stockDecremented = true;

    // Generate order number
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `ENTION-${timestamp}-${random}`;

    // Format the data to match the Order schema
    const orderData = {
      userId: req.body.userId,
      orderNumber: orderNumber,
      product: {
        name: req.body.product?.name || 'ENTION Laptop',
        model: req.body.product?.model || 'E3',
        configuration: {
          ram: req.body.product?.selectedRam || '8GB',
          ssd: req.body.product?.selectedSSD || '512GB',
          warranty: req.body.product?.selectedWarranty || '18 Months (Default)'
        },
        features: [],
        price: req.body.product?.price || 0,
        mrp: req.body.product?.basePrice || 0,
        discount: 0
      },
      shippingAddress: req.body.shippingAddress,
      payment: {
        method: req.body.paymentMethod || 'cod',
        status: 'pending'
      },
      status: 'pending'
    };

    const order = new Order(orderData);
    try {
      await order.save();
      return res.status(201).json(order);
    } catch (saveError) {
      if (stockDecremented && productModelTarget) {
        try {
          // Manual atomic rollback
          await Product.findOneAndUpdate(
            { model: productModelTarget },
            { $inc: { stock: 1 } }
          );
        } catch (rollbackError) {
          process.stderr.write(`[CRITICAL] Stock rollback failed for ${productModelTarget} on order error.\n`);
        }
      }
      return res.status(500).json({ error: 'Failed to complete order creation. Stock rolled back safely.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process checkout request.' });
  }
});

// Get user's orders
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get a specific order
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status — auto-stamps deliveredAt when transitioned to 'delivered'
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatePayload = { status };
    if (status === 'delivered') {
      updatePayload.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(orderId, updatePayload, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

const InvoiceService = require('../services/invoiceService');

// Request a Return (User scoped)
router.post('/orders/:orderId/return', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason, comments } = req.body;

    // Validate reason is present
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'Return reason is required.' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    if (order.status !== 'delivered') {
      return res.status(400).json({ success: false, message: 'Can only request a return for delivered orders.' });
    }

    // Prevent duplicate return requests unless the previous one was explicitly Rejected
    if (order.returnRequest && order.returnRequest.status && order.returnRequest.status !== 'Rejected') {
      return res.status(400).json({ success: false, message: 'An active return request is already in progress.' });
    }

    // Require deliveredAt — block if missing (safety guard)
    if (!order.deliveredAt) {
      return res.status(400).json({ success: false, message: 'Delivery confirmation date is missing. Cannot process return.' });
    }

    // Enforce 3-day return window based on actual deliveredAt
    const daysSinceDelivery = (new Date() - order.deliveredAt) / (1000 * 60 * 60 * 24);
    if (daysSinceDelivery > 3) {
      return res.status(400).json({ success: false, message: 'Return window of 3 days has expired.' });
    }

    order.returnRequest = { reason: reason.trim(), comments: comments?.trim(), status: 'Pending', requestedAt: new Date() };
    await order.save();

    res.json({ success: true, data: { message: 'Return request submitted successfully.', orderId: order._id, orderNumber: order.orderNumber } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit return request.' });
  }
});

// Admin approves return and triggers Razorpay refund
router.put('/orders/:orderId/admin-return', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    // Guard: order and pending return must exist
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    if (!order.returnRequest || !order.returnRequest.status) {
      return res.status(400).json({ success: false, message: 'No return request exists for this order.' });
    }
    if (order.returnRequest.status !== 'Pending') {
      return res.status(400).json({ success: false, message: `Return request is already in status: ${order.returnRequest.status}. Cannot re-process.` });
    }

    // Guard: prevent double-refund if already returned
    if (order.status === 'returned') {
      return res.status(400).json({ success: false, message: 'Order is already marked as returned.' });
    }

    // Attempt Razorpay refund only if payment was completed with a valid transactionId
    const canRefund = order.payment &&
      order.payment.status === 'success' &&
      order.payment.transactionId;

    if (canRefund) {
      try {
        const razorpayInstance = razorpayService();
        await razorpayInstance.refundPayment(order.payment.transactionId, order.product.price);
        order.returnRequest.status = 'Approved';
        order.status = 'returned';
      } catch (refundError) {
        // Log but do not crash — mark as failed for manual resolution
        process.stderr.write(`[REFUND_FAILED] orderId=${order._id} txnId=${order.payment.transactionId} err=${refundError.message}\n`);
        order.returnRequest.status = 'Refund_Failed';
        // Note: order.status remains unchanged (delivered) until payment safely reverses
      }
    } else {
      // COD or unpaid orders — approve without Razorpay
      order.returnRequest.status = 'Approved';
      order.status = 'returned';
    }

    order.returnRequest.processedAt = new Date();
    await order.save();
    res.json({ success: true, data: { message: 'Return processed.', returnStatus: order.returnRequest.status, orderStatus: order.status } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to process admin return.' });
  }
});

// PDF Invoice Streaming
router.get('/orders/:orderId/invoice', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${order.orderNumber}.pdf`);

    InvoiceService.generateInvoice(
      order,
      (chunk) => res.write(chunk),
      () => res.end()
    );
  } catch (error) {
    console.error('Invoice generation failed:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Failed to generate invoice' });
  }
});

// Update payment status
router.put('/orders/:orderId/payment', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus, transactionId } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, {
      paymentStatus,
      transactionId
    }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Razorpay Integration Routes

// Create Razorpay order for payment
router.post('/payment/create-order', async (req, res) => {
  try {
    console.log('Received payment order request:', req.body);

    const { product, shippingAddress, paymentMethod } = req.body;

    // Calculate total amount in paise (Razorpay expects amount in paise)
    const totalAmount = Math.round((product.price || 0) * 100);

    console.log('Calculated amount:', totalAmount, 'paise');

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create Razorpay order
    const razorpayInstance = razorpayService();
    const razorpayOrder = await razorpayInstance.createOrder({
      amount: totalAmount / 100, // Convert back to rupees for the service
      orderNumber: `order_${Date.now()}`,
      product: product,
      shippingAddress: shippingAddress
    });

    console.log('Razorpay order created:', razorpayOrder);

    res.json({
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID || null
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
router.post('/payment/verify', async (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;

    if (!paymentId || !orderId || !signature) {
      return res.status(400).json({ error: 'Payment verification data is required' });
    }

    // Use actual Razorpay service to verify payment
    const razorpayInstance = razorpayService();
    const verificationResult = await razorpayInstance.verifyPayment(paymentId, orderId, signature);

    if (verificationResult.verified) {
      res.json({
        success: true,
        verified: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        verified: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Get payment methods
router.get('/payment/methods', (req, res) => {
  try {
    const methods = [
      { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
      { id: 'upi', name: 'UPI', icon: '📱' },
      { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
      { id: 'wallet', name: 'Wallet', icon: '👛' }
    ];
    res.json(methods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Failed to fetch payment methods' });
  }
});



// Delivery Integration Routes

// Check pincode serviceability
router.get('/delivery/pincode/:pincode', async (req, res) => {
  try {
    const { pincode } = req.params;

    // Use actual Delhivery service to check pincode serviceability
    const serviceability = await delhiveryService.checkPincodeServiceability(pincode);

    res.json({
      pincode,
      serviceable: serviceability.serviceable,
      estimatedDays: serviceability.serviceable ? 3 : 7,
      couriers: serviceability.serviceable ? ['Delhivery'] : [],
      city: serviceability.city,
      state: serviceability.state,
      district: serviceability.district
    });
  } catch (error) {
    console.error('Error checking pincode serviceability:', error);
    res.status(500).json({ error: 'Failed to check pincode serviceability' });
  }
});

// Get pincode details
router.get('/delivery/pincode-details/:pincode', async (req, res) => {
  try {
    const { pincode } = req.params;

    // Use actual Delhivery service to get pincode details
    const details = await delhiveryService.getPincodeDetails(pincode);

    if (details && details.length > 0) {
      const pincodeData = details[0];
      res.json({
        pincode,
        city: pincodeData.city,
        state: pincodeData.state,
        district: pincodeData.district,
        country: 'India',
        postOffice: pincodeData.postOffice
      });
    } else {
      res.status(404).json({ error: 'Pincode not found' });
    }
  } catch (error) {
    console.error('Error fetching pincode details:', error);
    res.status(500).json({ error: 'Failed to fetch pincode details' });
  }
});

// Calculate shipping cost
router.post('/delivery/calculate-shipping', async (req, res) => {
  try {
    const { fromPincode, toPincode, weight = 2.5 } = req.body;

    // Use actual Delhivery service to calculate shipping cost
    const shippingCost = await delhiveryService.calculateShippingCost(fromPincode || '400001', toPincode, weight);

    res.json({
      cost: shippingCost.total_amount || 150,
      estimatedDays: shippingCost.estimated_delivery_days || 3,
      courier: 'Delhivery',
      details: shippingCost
    });
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    // Fallback to default shipping cost
    res.json({
      cost: 150,
      estimatedDays: 3,
      courier: 'Delhivery'
    });
  }
});

// Get estimated delivery date
router.post('/delivery/estimated-delivery', async (req, res) => {
  try {
    const { fromPincode, toPincode } = req.body;

    // Use actual Delhivery service to get estimated delivery
    const estimatedDelivery = await delhiveryService.getEstimatedDelivery(fromPincode || '400001', toPincode);

    res.json(estimatedDelivery);
  } catch (error) {
    console.error('Error getting estimated delivery:', error);
    // Fallback to default estimate
    res.json({
      estimatedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDays: 7,
      serviceable: false
    });
  }
});

// Validate address
router.post('/delivery/validate-address', async (req, res) => {
  try {
    const addressData = req.body;

    // Use actual Delhivery service to validate address
    const validation = await delhiveryService.validateAddress(addressData);

    res.json({
      valid: validation.valid,
      suggestions: validation.suggestions || [],
      correctedAddress: validation.valid ? addressData : null,
      pincodeData: validation.pincodeData
    });
  } catch (error) {
    console.error('Error validating address:', error);
    res.status(500).json({ error: 'Failed to validate address' });
  }
});

// Create waybill for order
router.post('/delivery/create-waybill/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Get order details first
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Use actual Delhivery service to create waybill
    const waybillData = await delhiveryService.createWaybill({
      orderNumber: order.orderNumber,
      product: order.product,
      shippingAddress: order.shippingAddress,
      payment: { method: order.payment.method }
    });

    res.json({
      success: true,
      waybill: waybillData
    });
  } catch (error) {
    console.error('Error creating waybill:', error);
    res.status(500).json({ error: 'Failed to create waybill' });
  }
});

// Track shipment
router.get('/delivery/track/:waybillNumber', async (req, res) => {
  try {
    const { waybillNumber } = req.params;

    // Use actual Delhivery service to track shipment
    const trackingInfo = await delhiveryService.trackShipment(waybillNumber);

    res.json(trackingInfo);
  } catch (error) {
    console.error('Error tracking shipment:', error);
    res.status(500).json({ error: 'Failed to track shipment' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Checkout API is running' });
});

module.exports = router; 