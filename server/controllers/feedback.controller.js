const Feedback = require('../models/feedback.model');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const fetch = require('node-fetch');
const Email = require('../utils/email');
require('dotenv').config();

exports.getAll = catchAsync(async function (req, res) {
    let data = await Feedback.find({});
    let feedbacks = [];
    
    const promises = data.map(async function (feedback) {
        let res = await fetch(`${process.env.EMOTION_DETECTION_API}?text=${feedback.message}`);
        let emotion = await res.json();
        feedbacks.push({ ...feedback._doc, emotion: emotion.isNegative ? '🔴' : '🟢' })
    });

    await Promise.all(promises);
    return res.send({ data: feedbacks });

});

exports.createFeedback = catchAsync(async function(req, res, next) {
    const user = req.user;
    let feedback = Feedback({
        user: user._id,
        message: req.body.message
    });

    feedback.save();
    res.send(feedback);

    let result = await fetch(`${process.env.EMOTION_DETECTION_API}?text=${feedback.message}`);
    let emotion = await result.json();

    const email = new Email({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: process.env.ADMIN_EMAIL,
        isNegative: emotion.isNegative,
        feedback: req.body.message
    });

    email.sendFeedbackAlert();

});