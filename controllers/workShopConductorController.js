const WorkShopConductor = require('../models/workShopConductor');

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

module.exports = {
    addWorkShopConductor,
    getAllWorkShopConductoresNotApproved,
    setWorkShopConductorAsApproved
}