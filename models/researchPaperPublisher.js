const mongoose = require('mongoose');

const ResearchPaperPublisherSchema = new mongoose.Schema({
    first_name: {type:String,  required:true},
    last_name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    phone: {type:String, required:true, unique:true},
    researchPaper_url: {type:String, required:false},
    is_approved: {type: Boolean, required: true},
});

const ResearchPaperPublisher = mongoose.model('research_paper_publishers', ResearchPaperPublisherSchema);
module.exports = ResearchPaperPublisher;