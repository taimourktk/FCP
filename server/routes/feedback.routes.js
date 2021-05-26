const express = require('express');
const feedbackController = require('../controllers/feedback.controller');
const router = express.Router();
const authController = require('../controllers/auth.controller')

router.get('/', feedbackController.getAll);

router.use(authController.protect);
router.post('/', feedbackController.createFeedback);

module.exports = router;