const Template = require('../../models/template');

const addTemplate = async(req, res) => {
    try {
        if(req.body){
            const template = new Template(req.body);
            await template.save()
             .then((data) => {
                 res.status(200).send({ data: data });
             })
             .catch((error) => {
                 res.status(500).send({ error: error.message });
             }) 
        }
    }
    catch(error) {
        res.send({ error: error });
    }
};

const getAllTemplate = async (req, res) => {
    try {
        await Template.find({  })
        .then((data) => {
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            res.status(500).send({ error: error });
        })
    }
    catch(error) {
        res.send({ error: error });
    }
};

const getOneTemplate = async(req,res)=>{
    if(req.params.id){
      await Template.findById(req.params.id)
      .then((data)=>{
        res.status(200).send({data:data});
      })
      .catch((error)=>{
        res.status(500).send({error:error})
      })
    }
};
  
  const updateTemplate = async (req, id, res) => {
    try {
      if (req.body && id) {
        await Template.findByIdAndUpdate(id, { $set : req.body
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
  
  const deleteTemplate = async (req, res) => {
    try {
      if (req.params.id) {
        await Template.findByIdAndDelete(req.params.id)
          .then((data) => {
            res.status(200).send({ data: data });
          })
          .catch((error) => {
            res
              .status(500)
              .send({ error: error});
          });
      }
    } catch (error) {
      res.send({ error: error });
    }
  };

  const countTemplates = async(req, res) => {
    await Template.find({  })
     .then((data) => {
       res.status(200).send({ data: data.length })
     })
     .catch((error) => {
      res.status(500).send({ error: error.message })
     })
  }

  module.exports = {
    addTemplate,
    getAllTemplate,
    getOneTemplate,
    updateTemplate,
    deleteTemplate,
    countTemplates
  }