
const Keynote = require("../models/keynote.model");

const addKeynote = async (req, res) => {
  try {
    if (req.body) {
      const keynote = new Keynote(req.body);
      await keynote
        .save()
        .then((data) => {
          res.status(200).send({ data: data });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    }

  } catch (error) {
    res.send({ error: error });
  }
};

const getAllKeynotes = async (req, res) => {
  try {
    await Keynote.find()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error});
      });
  } catch (error) {
    res.send({ error: error });
  }
};

const getKeynoteByID = async(req,res)=>{
  if(req.params.id){
    await Keynote.findById(req.params.id)
    .then((data)=>{
      res.status(200).send({data:data});
    })
    .catch((error)=>{
      res.status(500).send({error:error})
    })
  }
 
}

const updateKeynote = async (req, res) => {
  try {
    if (req.body && req.params.id) {
      await Keynote.findByIdAndUpdate(req.params.id, { $set : req.body
      })
        .then((data) => {
          res.status(200).send({ data: data });
        })
        .catch((error) => {
          res.status(500).send({ error: error });
        });
    }
  } catch (error) {
    res.send({ error: error });
  }
};

const deleteKeynote = async (req, res) => {
  try {
    if (req.params.id) {
      await Keynote.findByIdAndDelete(req.params.id)
        .then((data) => {
          res.status(200).send({ data: data, message:"Successfully deleted"});
        })
        .catch((error) => {
          res
            .status(500)
            .send({ error: error, message: "Delete failed" });
        });
    }
  } catch (error) {
    res.send({ error: error });
  }
};
const getApprovedKeynotes = async(req,res)=>{
  await Keynote.find({is_approved:true})
  .then((data)=>{
    res.status(200).send({data:data});
  })
  .catch((error)=>{
      res.status(500).send({error:error})
  })
}

const getPendingKeynotes = async(req,res)=>{
  await Keynote.find({is_approved:false})
  .then((data)=>{
    res.status(200).send({data:data});
  })
  .catch((error)=>{
      res.status(500).send({error:error})
  })
}



module.exports = {
  deleteKeynote,
  getAllKeynotes,
  updateKeynote,
  addKeynote,
  getApprovedKeynotes,
  getPendingKeynotes,
  getKeynoteByID
};
