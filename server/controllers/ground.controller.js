const Ground = require("../models/ground.model");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAll = factory.getAll(Ground);
exports.create = factory.createOne(Ground);

exports.getAvailableSlots = catchAsync(async function (req, res) {
    let ground = await Ground.findById(req.params.id);
    let hours = ground.availableHours;
    if (!ground || !ground.bookings) {
        return res.send([]);
    }
    let booked = ground.bookings.filter(booking => {
        return booking.date == req.params.date
    });

    let bookedHours = booked.map(booking => booking.hours);
    bookedHours = bookedHours.flat();
    bookedHours = Array.from(new Set(bookedHours));

    if (booked.length === 0) {
        return res.send(hours);
    }

    let availableHours = hours.filter(hour => {
        let available = true;
        booked.forEach(booking => {
            available = bookedHours.indexOf(hour) === -1;
        });
        return available;
    });

    res.send(availableHours);
});

exports.bookSlots = catchAsync(async function(req, res) {
    let hours = req.body.hours;
    let groundId = req.params.id;
    let userId = req.user.id;
    let date = req.body.date;


    let doc = await Ground.updateOne({ _id: groundId }, {
        $push: {
            bookings: {
                hours,
                userId,
                date
            }
        }
    });

    res.send(doc);
});