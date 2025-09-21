const Booking = require('../models/Booking');

exports.demo = (req, res) => {
  Booking.clear();
  const now = Date.now();

  const sample = Booking.create({
    studentName: 'Alice',
    tutorName: 'Tutor A',
    topic: 'Networks',
    start: new Date(now + 10 * 60 * 1000).toISOString(),
    end:   new Date(now + 70 * 60 * 1000).toISOString(),
    status: 'confirmed'
  });

  return res.json({ seeded: true, sample });
};
