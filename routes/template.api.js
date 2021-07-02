const express = require('express');
const router = express.Router();
const TemplateController = require('../controllers/Template/templatecontroller');

const TemplateAPI = () => {
    router.get('/templateAllFront', TemplateController.getAllTemplate);
    return router;
}

module.exports = TemplateAPI;