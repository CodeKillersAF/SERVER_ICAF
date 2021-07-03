const mongoose = require('mongoose');

const ConferenceDetailSchema = new mongoose.Schema({

    venue: {
        type: String,
        required: true
    },
    venue_dates: {
        type: String,
        required: true
    },
    venue_time: {
        type: String,
        required: true
    },
    registrationopen_date: {
        type: String,
        required: true
    },
    lastregistration_date: {
        type: String,
        required: true
    },
    is_approved: {
        type: Boolean,
        required: true,
        default: false
    }
    // events: [
    //     {
    //         topic: { type: String },
    //         discussions: [{ type: String }]
    //     }
    // ]

});

const ConferenceDetail = mongoose.model('conference-detail', ConferenceDetailSchema);
module.exports = ConferenceDetail;