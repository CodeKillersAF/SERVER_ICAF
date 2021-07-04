const Attendee = require('../models/attendee.js');
const  nodemailer = require('nodemailer');

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
        await Attendee.find({is_approved : true})
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

//Get all attendees not approved attendees
const getAllAttendess = async (req,res) => {
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

//Give approval for not approved attendees
const setApproval = async (req,res) => {
    try {
        if(req.params){
            await Attendee.findByIdAndUpdate(req.params.id,{is_approved: true})
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            })
        }
    } catch (error) {
        res.send({error: error.message});
    }
}

const sendEmailToApprovedAttendee = async (req,res) => {
    try {
        await Attendee.findById(req.params.id)
        .then(data => {
            console.log('I am here' , data.email)
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: 'pamalofficial@gmail.com',
                  pass: 'dellnvidiacorei7'
                }
              });

              var mailOptions = {
                from: 'pamalofficial@gmail.com',
                to: data.email,
                subject: 'ICAF',
                text: 'You are registered !'
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });         
        })

    } catch (error) {
        res.send({error: error.message});
    }
}

const getAllAttendees = async (req,res) => {
    try {
        await Attendee.find({})
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

const deleteOneAttendee = async (req,res) => {
    try {
        if(req.params.id){
            await Attendee.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).send({data: data})
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            })
        }
    } catch (error) {
        res.send({error: error.message});        
    }
}

const countApprovedAttendees = async (req,res) => {
    try {
        await Attendee.countDocuments({is_approved: true})
        .then(data => {
            res.status(200).send({data: data})
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
    getAttendeesApproved,
    getAllAttendess,
    setApproval,
    sendEmailToApprovedAttendee,
    getAllAttendees,
    deleteOneAttendee,
    countApprovedAttendees

}