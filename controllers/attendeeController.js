const Attendee = require('../models/attendee.js');

const addAttendee = async (req,res) => {
    if(req.body){
        const attendee = new Attendee(req.body);
        await attendee.save()
        .then(data => {
            res.status(200).send({data:data})
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })    
    }
}

//Get all attendees who is approved
const getAttendeesApproved = async(req,res) => {
    try {
        await Attendee.find({is_approved : false})
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })
    } catch (error) {
        res.send({error: error.message});
    }

}


module.exports = {
    addAttendee,
    getAttendeesApproved
}