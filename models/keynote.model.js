const mongoose = require('mongoose');

const keynoteSchema = mongoose.Schema({
    speakerName : { type :String , required :true , trim : true},
    position :{ type :String , required :true , trim : true},
    description : { type :String , required :true , trim : true},
    speakerImageUrl :{ type :String , required :false},
    is_approved:{type:Boolean ,default:false,required:false}
})

const keynote = mongoose.model('keynotes',keynoteSchema);

module.exports = keynote;