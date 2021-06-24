const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    phone: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    date: {type:Date, default:Date.now },
    is_approved: {type:Boolean, default:false, required:true},
    bank_slip_url: {type:String, required:false}

});

const Attendee = mongoose.model('attendees', AttendeeSchema);
module.exports = Attendee;