const User = require('../../models/User.model');

  //delete method
  const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    .then(data => {
      res.status(200).send({ data: "Deleted Successfully" });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }

const findUser = async (req, res) => {
  await User.findById(req.params.id)
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  })
}

//update operation
const updateUserDetails = async(req, res) => {
  if(req.body && req.params.id)
  {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
    })
    .then((data) => {
      res.status(200).send({ data: data })
    })
    .catch((error) => {
      res.status(500).send({ error: error.message })
    })
  }
}

const updateRole = async(req, res) => {
  if(req.body && req.params.id)
  {
    await User.findByIdAndUpdate(req.params.id, {
      role: req.body.role,
    })
    .then((data) => {
      res.status(200).send({ data: data.role })
    })
    .catch((error) => {
      res.status(500).send({ error: error.message })
    })
  }
}

  module.exports = {
      deleteUser,
      findUser,
      updateUserDetails,
      updateRole
  }