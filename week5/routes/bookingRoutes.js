const router = require('express').Router();
const c = require('../controllers/bookingController');

router.post('/', c.create); // POST /api/bookings
router.get('/', c.list);    // GET  /api/bookings

module.exports = router;
