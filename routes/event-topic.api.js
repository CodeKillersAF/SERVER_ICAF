const express = require('express');
const router = express.Router();
const EventTopicController = require('../controllers/event-topic.controller');

const eventTopicAPI = () => {
    router.post('/', EventTopicController.createEventTopic);
    router.get('/', EventTopicController.getEventTopics);
    router.delete('/:id',EventTopicController.removeTopic);
    router.put('/:id',EventTopicController.updateTopic);

    return router;
}

module.exports = eventTopicAPI;