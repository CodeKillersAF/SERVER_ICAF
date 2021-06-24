const ResearchPaperPublisher = require('../models/researchPaperPublisher');

const createResearchPaperPublisher = async (req,res) => {
    try {
        const researchPaperPublisher = new ResearchPaperPublisher(req.body);
        await researchPaperPublisher.save()
        .then(data => {
            res.status(200).send({data:data})
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })
    } catch (error) {
        res.send({error: error.message})
    }
}

module.exports = {
    createResearchPaperPublisher
};