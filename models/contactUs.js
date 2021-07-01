const mongoose = require('mongoose');

const ContactUsSchema = mongoose.Schema({
    name: {type:String, required:true },
    email: {type:String ,required:true, unique:true},
    subject:{type:String, required:true },
    message: {type:String, required:true }
});

const ContactUs = mongoose.model('contact_us',ContactUsSchema);
module.exports = ContactUs;