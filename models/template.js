const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
    topic: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: false }
})

const Template = mongoose.model('templates', TemplateSchema);

module.exports = Template;