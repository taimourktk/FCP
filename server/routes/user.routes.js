const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const path = require('path');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/c/count', userController.getCount);
router.get('/', userController.getAll);
router.get('/confirmEmail', authController.confirmEmail);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password', authController.resetForgottenPassword);
router.get('/reset-password-page', function (req, res) {
    res.sendFile(path.join(__dirname + "/../pages/reset-password.html"));
})

router.use(authController.protect);

router.put('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.put('/me', userController.updateMe);

module.exports = router;
