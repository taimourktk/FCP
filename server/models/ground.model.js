const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseSchema = Schema({
    
    name: {
        type: String,
        required: [true, 'Ground Name is required']
    },
    rate: {
        type: Number,
        required: [true, 'Rate per hour is required']
    },
    location: {
        type: String,
        required: [true, 'Ground Location is required']
    },
    city: {
        type: String,
        required: [true, 'Ground city is required']
    },
    availableHours: [{
        type: Number,
        default: []
    }],
    bookings: {
        type: [{
            date: {
                type: String,
                required: true,
            },
            hours: [{
                type: Number,
                required: true,
            }],
            userId: {
                type: String,
                required: true,
            }
        }]
    }

}, {
    timestamp: true
});

module.exports = mongoose.model('Ground', mongooseSchema);