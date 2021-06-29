const express = require('express');
const router = express.Router();
const EventDiscussionController = require('../controllers/event-discussion.controller');

const eventDiscussionAPI = () => {
    router.post('/', EventDiscussionController.createEventDiscussion);
    router.get('/', EventDiscussionController.getEventDiscussions);
    router.delete('/:id', EventDiscussionController.removeDiscussion);

    return router;
}

module.exports = eventDiscussionAPI;