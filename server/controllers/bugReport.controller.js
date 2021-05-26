const BugReport = require('../models/bug.model');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
require('dotenv').config();
const Email = require('../utils/email');

exports.getAll = factory.getAll(BugReport);

exports.createBugReport = catchAsync(async function(req, res, next) {
    const user = req.user;
    let report = BugReport({
        user: user._id,
        message: req.body.message
    })
    report.save();
    res.send(report);

    const email = new Email({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: process.env.ADMIN_EMAIL,
        message: req.body.message
    });

    email.sendBugAlert();

});