const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugReportSchema = new Schema({
    message: {
        type: String,
        required: [true, 'Feedback message is required']
    },
    user: {
        type: String,
        required: [true, 'User is required to provide a feedback']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Feedback', bugReportSchema);