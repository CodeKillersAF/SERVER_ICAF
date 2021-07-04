const ContactUs = require('../models/contactUs');

const createAContact = async (req,res) => {
    try {
        if(req.body){
            const contact = new ContactUs(req.body);
            await contact.save()
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            })
        }
    } catch (error) {
        res.send({error: error.message})
    }
}

const getAllContacts = async (req,res) => {
    try {
        await ContactUs.find({})
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
    createAContact,
    getAllContacts
}