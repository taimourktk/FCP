const express = require('express');
const bugReportController = require('../controllers/bugReport.controller');
const router = express.Router();
const authController = require('../controllers/auth.controller')

router.get('/', bugReportController.getAll);

router.use(authController.protect);
router.post('/', bugReportController.createBugReport);

module.exports = router;