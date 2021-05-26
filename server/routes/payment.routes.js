const Router = require('express').Router();
const paymentController = require('../controllers/payment.controller');

Router.get('/', paymentController.createTransaction);

module.exports = Router;