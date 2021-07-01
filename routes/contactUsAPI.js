const express = require('express');
const router = express.Router();
const ContactUsController = require('../controllers/contactUsController');

const ContactUsAPI = () => {
    router.post('/create-a-contact' , ContactUsController.createAContact);
    return router;
}

module.exports = ContactUsAPI;

