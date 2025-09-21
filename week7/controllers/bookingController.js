const Booking = require('../models/Booking');

exports.getAll = (req, res) => {
  const items = Booking.find();
  return res.status(200).json(items);
};

exports.getOne = (req, res) => {
  const found = Booking.findById(req.params.id);
  if (!found) return res.status(404).json({ error: 'Not found' });
  return res.status(200).json(found);
};

exports.create = (req, res) => {
  const { studentName, tutorName, topic, start, end, status } = req.body;

  // Basic validation to avoid 500s
  if (!studentName || !tutorName || !topic || !start || !end) {
    return res.status(400).json({
      error: 'studentName, tutorName, topic, start, end are required'
    });
  }

  const doc = Booking.create({ studentName, tutorName, topic, start, end, status });
  return res.status(201).json(doc);
};
