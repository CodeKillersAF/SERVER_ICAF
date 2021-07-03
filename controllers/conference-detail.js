const ConferenceDetail = require('../models/conference-detail.model');
const nodemailer = require('nodemailer');

const createConferenceDetails = async (req, res) => {
    if (req.body) {
        const conference_detail = new ConferenceDetail(req.body);
        await conference_detail.save()
            .then(data => {
                res.status(200).send({ data: data })
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

const getConferenceDetails = async (req, res) => {
    await ConferenceDetail.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const updateStatus = async (req, id, res) => {
    if (id && req.body) {
        await ConferenceDetail.findByIdAndUpdate(id, {
            is_approved: req.body.is_approved
        })
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((err) => {
                res.status(500).send({ err: err.message });
            });
    }
};

const updateAllDetails = async (req, id, res) => {
    if (id && req.body) {
        await ConferenceDetail.findByIdAndUpdate(id, {
            venue: req.body.venue,
            venue_dates: req.body.venue_dates,
            venue_time: req.body.venue_time,
            registrationopen_date: req.body.registrationopen_date,
            lastregistration_date: req.body.lastregistration_date,
            is_approved: req.body.is_approved
        })
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((err) => {
                res.status(500).send({ err: err.message });
            });
    }
};

const removeConferenceDetail = async (req, res) => {
    if (req.params.id) {
        await ConferenceDetail.findByIdAndRemove(req.params.id)
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((error) => {
                res.status(500).send(error.message);
            });
    }
};

const getConferenceDetailByID = async (req, res) => {
    if (req.params.id) {
        await ConferenceDetail.findById(req.params.id)
            .then((data) => {
                res.status(200).send({ data: data });
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    }
};

const sendMailConference = async (req,res) => {
    try {
           // console.log(data.email);
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: 'sunshine4payments@gmail.com',
                  pass: 'Sunshine1@AB'
                }
              });
              var mailOptions = {
                from: 'sunshine4payments@gmail.com',
                to: "kawsinote@gmail.com",
                subject: 'ICAF-Conference detail approval',
                text: 'Text - Editor has updated conference detail. Waiting for you approval'
              };
  
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    } catch (error) {
        res.send({error: error.message});
    }
  }

module.exports = {
    createConferenceDetails,
    getConferenceDetails,
    updateStatus,
    updateAllDetails,
    removeConferenceDetail,
    getConferenceDetailByID,
    sendMailConference
}