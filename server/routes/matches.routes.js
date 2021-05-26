const express = require('express');
const matchController = require('../controllers/match.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const factory = require('../controllers/handlerFactory');

router.get('/', matchController.getAll);
router.put('/summary/:id', matchController.addSummary);
router.put('/:id', matchController.update);

module.exports = router;