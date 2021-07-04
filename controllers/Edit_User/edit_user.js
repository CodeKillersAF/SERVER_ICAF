const User = require('../../models/User.model');
const nodemailer = require('nodemailer');

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

const sendMailUser = async (req,res) => {
  try {
         // console.log(data.email);
          var transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              requireTLS: true,
              auth: {
                user: 'sunshine4payments@gmail.com',
                pass: 'Sunshine1@AB'
              }
            });
            var mailOptions = {
              from: 'sunshine4payments@gmail.com',
              to: req.body.email,
              subject: 'ICAF',
              text: 'You are promoted as ICAF page admin role...! \n Please contact -> 077-32432123'
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
  } catch (error) {
      res.send({error: error.message});
  }
}

  module.exports = {
      deleteUser,
      findUser,
      updateUserDetails,
      updateRole,
      findUserByRole,
      getallUsers,
      sendMailUser,
  }