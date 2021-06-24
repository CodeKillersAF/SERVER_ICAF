const express = require('express');
const router = express.Router();
const ResearchPaperPublisherController = require('../controllers/researchPaperPublisher')


const ResearchPaperPublisherAPI = () => {
    router.post('/add-research-paper-publisher', ResearchPaperPublisherController.createResearchPaperPublisher);
    return router;
}

module.exports = ResearchPaperPublisherAPI;