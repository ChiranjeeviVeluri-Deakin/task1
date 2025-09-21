const express = require('express');
const router = express.Router();
const c = require('../controllers/bookingController');

router.get('/', c.getAll);       // GET /api/bookings
router.post('/', c.create);      // POST /api/bookings
router.get('/:id', c.getOne);    // GET /api/bookings/:id

module.exports = router;
