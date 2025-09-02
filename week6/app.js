// week5/app.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Views/static if you use them
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'week5-app' });
});

// Routes
app.use('/seed', require('./routes/seedRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));

// Test-only reset
if (process.env.NODE_ENV === 'test') {
  const { clear } = require('./models/Booking');
  app.post('/__test__/reset', (_req, res) => { clear(); res.status(204).end(); });
}

//  DO NOT CALL app.listen here
module.exports = app;
