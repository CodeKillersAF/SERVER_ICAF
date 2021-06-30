const EventTopic = require('../models/event-topic.model');

const createEventTopic = async (req, res) => {
    if (req.body) {
        const event_topic = new EventTopic(req.body);
        await event_topic.save()
            .then(data => {
                res.status(200).send({ data: data })
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

const getEventTopics = async (req, res) => {
    await EventTopic.find({}).populate('eventDiscussions', 'content')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const removeTopic = async (req, res) => {
    if (req.params.id) {
        await EventTopic.findByIdAndRemove(req.params.id)
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((error) => {
                res.status(500).send(error.message);
            });
    }
};

const updateTopic = async (req, res) => {
    if (req.params.id && req.body) {
        await EventTopic.findByIdAndUpdate(req.params.id, {
            topic: req.body.topic
        })
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((err) => {
                res.status(500).send({ err: err.message });
            });
    }
};

module.exports = {
    createEventTopic,
    getEventTopics,
    removeTopic,
    updateTopic
}