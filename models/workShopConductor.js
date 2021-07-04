const mongoose = require('mongoose');

const WorkShopConductorSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    phone: {type:String, required:true, unique:true},
    email:{type:String, required:true},
    praposal_url:{type:String, required:false},
    is_approved: {type:Boolean, required:true, default:false}
});

const WorkShopConductor = mongoose.model('work_shop_conductor', WorkShopConductorSchema);
module.exports = WorkShopConductor;