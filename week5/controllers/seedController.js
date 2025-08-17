const Booking = require('../models/Booking');

exports.demo = (_req, res) => {
  Booking.clear();
  const now = Date.now();
  const sample = Booking.create({
    studentName: 'Bob',
    tutorName:   'Alice',
    topic:       'Data Structures',
    start:       new Date(now + 10 * 60 * 1000).toISOString(),
    end:         new Date(now + 70 * 60 * 1000).toISOString(),
    status:      'confirmed'
  });
  res.json({ seeded: true, sample });
};
