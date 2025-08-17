const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Health check (GET /)
app.get('/', (_req, res) => {
  res.json({ status: 'ok', app: 'SkillSync MVC (no-DB)' });
});

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
const seedRoutes = require('./routes/seedRoutes');
app.use('/api/bookings', bookingRoutes);
app.use('/seed', seedRoutes);

// Dashboard (pretty UI)
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'SkillSync – MVC' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
);
