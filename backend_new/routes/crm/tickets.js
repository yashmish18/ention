const express = require('express');
const router = express.Router();
const Ticket = require('../../models/crm/Ticket');
const jwt = require('jsonwebtoken');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'business@ention.in';

// Admin guard — matches pattern used in routes/admin.js
const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email !== ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
        }
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};

// POST /api/crm/tickets — Create ticket (Public)
router.post('/', async (req, res) => {
    try {
        const { customerName, phone, email, serialNumber, issueDescription, preferredContactTime } = req.body;

        if (!customerName || !phone || !email || !serialNumber || !issueDescription) {
            return res.status(400).json({ success: false, message: 'customerName, phone, email, serialNumber, and issueDescription are required.' });
        }

        const ticket = new Ticket({ customerName, phone, email, serialNumber, issueDescription, preferredContactTime });
        await ticket.save();

        res.status(201).json({
            success: true,
            data: { ticketId: ticket.ticketId, message: 'Ticket created successfully. You will be contacted shortly.' }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create ticket.' });
    }
});

// PUT /api/crm/tickets/:id/status — Update ticket (Admin only)
router.put('/:id/status', isAdmin, async (req, res) => {
    try {
        const { status, estimateAmount, warrantyStatus, assignedTo } = req.body;

        const updateObj = { updatedAt: new Date() };
        if (status) updateObj.status = status;
        if (estimateAmount !== undefined) updateObj.estimateAmount = estimateAmount;
        if (warrantyStatus) updateObj.warrantyStatus = warrantyStatus;
        if (assignedTo) updateObj.assignedTo = assignedTo;

        const ticket = await Ticket.findByIdAndUpdate(req.params.id, updateObj, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found.' });
        }

        // Exclude happyCode from admin status update response
        const ticketObj = ticket.toObject();
        delete ticketObj.happyCode;

        res.json({ success: true, data: ticketObj });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update ticket.' });
    }
});

// POST /api/crm/tickets/:id/verify — Happy code verification (Admin only)
// On success: status → "Closed", happyVerified → true
// On failure: status unchanged
router.post('/:id/verify', isAdmin, async (req, res) => {
    try {
        const { happyCode } = req.body;

        if (!happyCode) {
            return res.status(400).json({ success: false, message: 'happyCode is required.' });
        }

        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found.' });
        }

        if (ticket.happyVerified) {
            return res.status(400).json({ success: false, message: 'Happy code has already been verified for this ticket.' });
        }

        if (ticket.happyCode !== happyCode) {
            // Do NOT change status on wrong code
            return res.status(400).json({ success: false, message: 'Invalid happy code.' });
        }

        // Correct code — close the ticket
        ticket.happyVerified = true;
        ticket.status = 'Closed';
        await ticket.save();

        res.json({ success: true, data: { message: 'Happy code verified. Ticket closed successfully.', ticketId: ticket.ticketId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to verify happy code.' });
    }
});

// GET /api/crm/tickets — List all tickets (Admin only, paginated)
// ?page=1&limit=20
router.get('/', isAdmin, async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
        const skip = (page - 1) * limit;

        const [tickets, total] = await Promise.all([
            Ticket.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-happyCode'),
            Ticket.countDocuments()
        ]);

        res.json({
            success: true,
            data: {
                tickets,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch tickets.' });
    }
});

// GET /api/crm/tickets/:id — Get single ticket by _id OR ticketId (Public)
// happyCode is never returned to the public
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findOne({
            $or: [{ ticketId: id }, ...(id.match(/^[a-f\d]{24}$/i) ? [{ _id: id }] : [])]
        }).select('-happyCode -phone -email -serialNumber -estimateAmount');

        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found.' });
        }

        res.json({ success: true, data: ticket });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch ticket.' });
    }
});

module.exports = router;
