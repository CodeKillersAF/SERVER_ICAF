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

module.exports = {
    addWorkShopConductor
}