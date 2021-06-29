const mongoose = require('mongoose');

const EventDiscussionSchema = new mongoose.Schema({
    content: [{
        type: String,
        required: true,
        trim: true
    }],

    eventTopics: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'eventTopics' }]

});

const EventDiscussion = mongoose.model('eventDiscussions', EventDiscussionSchema);
module.exports = EventDiscussion;