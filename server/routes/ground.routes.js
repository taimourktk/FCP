const express = require('express');
const groundController = require('../controllers/ground.controller');
const authController = require('../controllers/auth.controller')
const router = express.Router();

router.get('/', groundController.getAll);
router.post('/', groundController.create);
router.get('/slots/:id/:date', groundController.getAvailableSlots);

router.use(authController.protect);
router.put('/book/:id', groundController.bookSlots)

module.exports = router;