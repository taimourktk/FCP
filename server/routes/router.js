const express = require('express');
const router = express();

const userRouter = require('./user.routes');
const teamRouter = require('./team.routes');
const newsRouter = require('./news.routes');
const adminRouter = require('./admin.routes');
const imagesRoute = require('./images.routes');
const matchRoute = require('./matches.routes');
const tournamentRoute = require('./tournament.routes');
const exerciseRoute = require('./exercise.routes');
const groundRoute = require('./ground.routes');
const paymentRoute = require('./payment.routes');
const feedbackRoute = require('./feedback.routes');
const bugReportRoute = require('./bugReport.routes');
const injuryRoute = require('./injury.routes');

router.use('/users', userRouter);
router.use('/teams', teamRouter);
router.use('/news', newsRouter);
router.use('/admins', adminRouter);
router.use('/images', imagesRoute);
router.use('/matches', matchRoute);
router.use('/tournaments', tournamentRoute);
router.use('/exercise', exerciseRoute);
router.use('/ground', groundRoute);
router.use('/payment', paymentRoute);
router.use('/feedback', feedbackRoute);
router.use('/bug', bugReportRoute);
router.use('/injury', injuryRoute);

module.exports = router;