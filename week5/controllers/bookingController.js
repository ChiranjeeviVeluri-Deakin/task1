const Booking = require('../models/Booking');

// POST /api/bookings
exports.create = (req, res) => {
  const required = ['studentName','tutorName','topic','start','end'];
  for (const f of required) {
    if (!req.body[f]) return res.status(400).json({ error: `Missing field: ${f}` });
  }
  const booking = Booking.create(req.body);
  res.status(201).json(booking);
};

// GET /api/bookings
exports.list = (_req, res) => {
  res.json(Booking.find());
};
