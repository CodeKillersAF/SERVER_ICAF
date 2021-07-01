const User = require('../../models/User.model');

  //delete method
  const deleteUser = async (id, res) => {
    await User.findByIdAndDelete(id)
    .then(data => {
      res.status(200).send({ data: "Deleted Successfully" });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }

const findUser = async (id, res) => {
  if(id){
  await User.findById(id)
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  })
 }
}

//update operation
const updateUserDetails = async(req, id, res) => {
  
  if(req && id)
  {
    await User.findByIdAndUpdate(id, {
      name: req.name,
      email: req.email,
      username: req.username
    })
    .then((data) => {
      res.status(200).send({ data: data })
    })
    .catch((error) => {
      res.status(500).send({ error: error.message })
    })
  }
}

const updateRole = async(req, id, res) => {
 // console.log('test');

  if(req.body && id)
  {
    await User.findByIdAndUpdate(id, {
      role: req.body.role,
    })
    //console.log(role);
    .then((data) => {
      res.status(200).send({ data: data.role })
    })
    .catch((error) => {
      res.status(500).send({ error: error.message })
    })
  }
}

const findUserByRole = async(name, res) => {
  if(name){
    await User.find({role: name})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    })
  }
}

const getallUsers = async(req, res) => {
  await User.find({ })
   .then((data) => {
      res.status(200).send({ data: data });
   })
   .catch((error) => {
      res.status(500).send({ error: error.message });
   })
}

  module.exports = {
      deleteUser,
      findUser,
      updateUserDetails,
      updateRole,
      findUserByRole,
      getallUsers
  }