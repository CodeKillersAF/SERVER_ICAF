const EventDiscussion = require('../models/event-discussion.model');

const createEventDiscussion = async (req, res) => {
    if (req.body) {
        const event_discussion = new EventDiscussion(req.body);
        console.log(req.body)
        await event_discussion.save()
            .then(data => {
                res.status(200).send({ data: data })
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

const getEventDiscussions = async (req, res) => {
    await EventDiscussion.find({}).populate('eventTopics', 'name')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const removeDiscussion = async (req, res) => {
    if (req.params.id) {
        await EventDiscussion.findByIdAndRemove(req.params.id)
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((error) => {
                res.status(500).send(error.message);
            });
    }
};

module.exports = {
    createEventDiscussion,
    getEventDiscussions,
    removeDiscussion
}