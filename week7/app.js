const express = require('express');
const path = require('path');

const bookingRoutes = require('./routes/bookingRoutes');
const seedRoutes = require('./routes/seedRoutes'); // optional

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// health
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running fine' });
});

// demo seed (optional)
app.use('/seed', seedRoutes);

// bookings
app.use('/api/bookings', bookingRoutes);

// realtime demo page
app.get('/realtime.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'realtime.html'));
});

// convenience: root -> realtime demo
app.get('/', (req, res) => {
  res.redirect('/realtime.html');
});

module.exports = app;
