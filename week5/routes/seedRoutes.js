const router = require('express').Router();
const c = require('../controllers/seedController');

router.post('/demo', c.demo); // POST /seed/demo

module.exports = router;
