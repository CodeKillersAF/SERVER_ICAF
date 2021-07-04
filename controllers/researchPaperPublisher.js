const ResearchPaperPublisher = require('../models/researchPaperPublisher');
const  nodemailer = require('nodemailer');

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

//get all research paper publishers who are approved

const getResearchPaperPublisherApproved = async (req,res) => {
    try {
        await ResearchPaperPublisher.find({is_approved : false})
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })
    } catch (error) {
        res.send({error: error.messsage});
    }
}

const setResearchPaperAsApproved = async (req,res) => {
    try {
        if(req.params.id){
            await ResearchPaperPublisher.findByIdAndUpdate(req.params.id, {is_approved: true})
            .then(data => {
                res.status(200).send({data:data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            })
        } 
    } catch (error) {
        res.send({error: error.message});
    }
}

const sendEmailToApprovedResearchPapers = async (req,res) => {
    try {
        await ResearchPaperPublisher.findById(req.params.id)
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
                text: 'You are registered !',
                html: '<h1>Welcome</h1><a href="www.google.com">pay here</a>'
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

const getAllResearchPaperPublishers = async (req,res) => {
    try {
        await ResearchPaperPublisher.find({})
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

const deleteOnePublisher = async (req,res) => {
    try {
        if(req.params.id){
            await ResearchPaperPublisher.findByIdAndDelete(req.params.id)
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

const countApprovedResearchPapers = async (req,res) => {
    try {
        await ResearchPaperPublisher.countDocuments({is_approved: true})
        .then(data => {
            res.status(200).send({data: data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })
    } catch (error) {
        res.send({error: error.message});
    }
}

module.exports = {
    createResearchPaperPublisher,
    getResearchPaperPublisherApproved,
    setResearchPaperAsApproved,
    sendEmailToApprovedResearchPapers,
    getAllResearchPaperPublishers,
    deleteOnePublisher,
    countApprovedResearchPapers
};