const express = require('express');
const router = express.Router();
const AttendeeController = require('../controllers/attendeeController');

const AttendeeAPI = () => {
    router.post('/add-attendee', AttendeeController.addAttendee);
    router.get('/get-attendees-is-approved'  , AttendeeController.getAttendeesApproved);
    return router;
}

module.exports = AttendeeAPI;