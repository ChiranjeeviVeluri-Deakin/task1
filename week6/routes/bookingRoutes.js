const express = require('express');
const router = express.Router();
const c = require('../controllers/bookingController');

// /bookings
router.get('/', c.list);
router.post('/', c.create);

// /bookings/:id
router.get('/:id', c.getOne);

module.exports = router;
