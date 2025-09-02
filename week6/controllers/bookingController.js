// week5/controllers/bookingController.js
const Booking = require('../models/Booking');

function validate(body) {
  return body &&
    typeof body.studentName === 'string' && body.studentName.trim().length > 0 &&
    typeof body.tutorName   === 'string' && body.tutorName.trim().length > 0 &&
    typeof body.topic       === 'string' && body.topic.trim().length > 0 &&
    typeof body.start       === 'string' && body.start.trim().length > 0 &&
    typeof body.end         === 'string' && body.end.trim().length > 0;
}

exports.list = (_req, res) => {
  res.status(200).json(Booking.find());
};

exports.create = (req, res) => {
  if (!validate(req.body)) {
    return res.status(400).json({ error: 'Invalid payload: studentName, tutorName, topic, start, end are required' });
  }
  const created = Booking.create(req.body);
  res.status(201).json(created);
};

exports.getOne = (req, res) => {
  const all = Booking.find();
  const id = req.params.id;                         // ← keep as STRING
  const found = all.find(b => b._id === id);        // ← string-to-string compare
  if (!found) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(found);
};
