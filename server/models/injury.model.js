const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const injurySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Exercise title is required'],
    },
    videoId: {
        type: String,
        required: [true, 'Video id is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    content: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Injury', injurySchema);