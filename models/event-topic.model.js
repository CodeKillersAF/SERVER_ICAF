const mongoose = require('mongoose');

const EventTopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    eventDiscussions: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'eventDiscussions' }]

});

const EventTopic = mongoose.model('eventTopics', EventTopicSchema);
module.exports = EventTopic;