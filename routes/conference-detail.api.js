const express = require('express');
const router = express.Router();
const ConferenceDetailController = require('../controllers/conference-detail');

const conferenceDetailAPI = () => {
    router.post('/', ConferenceDetailController.createConferenceDetails);
    router.get('/', ConferenceDetailController.getConferenceDetails);
    router.put('/:id', ConferenceDetailController.updateAllDetails);
    router.put('/update-status/:id', ConferenceDetailController.updateStatus);
    router.delete('/:id', ConferenceDetailController.removeConferenceDetail);

    return router;
}

module.exports = conferenceDetailAPI;