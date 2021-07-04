const WorkShopConductor = require('../models/workShopConductor');
const  nodemailer = require('nodemailer');

const addWorkShopConductor = async (req,res) => {
 try {
     if(req.body){
         const workShopConductor = new WorkShopConductor(req.body);
         await workShopConductor.save()
         .then(data => {
             res.status(200).send({data:data})
         })
         .catch(error => {
             res.status(500).send({error: error.message});
         })
     } 
 } catch (error) {
     res.send({error: error.message})
 }
}

//get all work shop conductors who are not approved
const getAllWorkShopConductoresNotApproved = async (req,res) => {
    try {
        await WorkShopConductor.find({is_approved: false})
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

const setWorkShopConductorAsApproved = async (req,res) => {
    try {
        if(req.params.id){
            await WorkShopConductor.findByIdAndUpdate(req.params.id,{is_approved:true})
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

const sendEmailToApprovedConductor = async (req,res) => {
    try {
        await WorkShopConductor.findById(req.params.id)
        .then(data => {
            console.log(data.email);
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
                text: 'Your praposal has been approved!'
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

//Get all work shop conductors
const getAllWorkShopConductors = async (req,res) => {
    try {
        
    await WorkShopConductor.find({})
    .then(data => {
        res.status(200).send({data:data});
    })
    .catch(error => {
        res.status(500).send({error: error.message});
    })
        
    } catch (error) {
        res.send({error: error})
    }

}

//Delete particular workshop conductor

const deleteOneWorkShopConductor = async (req,res) => {
    if(req.params.id){
        await WorkShopConductor.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })
    }
}

const countApprovedWorkShops = async (req,res) => {
    try {
        await WorkShopConductor.countDocuments({is_approved: true})
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error: error.message});
        })
    } catch (error) {
        res.send({error: error.message})
    }	
}

module.exports = {
    addWorkShopConductor,
    getAllWorkShopConductoresNotApproved,
    setWorkShopConductorAsApproved,
    sendEmailToApprovedConductor,
    getAllWorkShopConductors,
    deleteOneWorkShopConductor,
    countApprovedWorkShops
}