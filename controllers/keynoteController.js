const Keynote = require("../models/keynote.model");
const nodemailer = require("nodemailer");

//add a new keynote
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

//get all keynotes
const getAllKeynotes = async (req, res) => {
  try {
    await Keynote.find()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  } catch (error) {
    res.send({ error: error });
  }
};

//count keynotes
const countKeynotes = async (req, res) => {
  try {
    let keynoteCount =0;
    await Keynote.find()
      .then((data) => {
        keynoteCount = data.length;
        res.status(200).send({ count: keynoteCount });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  } catch (error) {
    res.send({ error: error });
  }
};

//get keynote using id
const getKeynoteByID = async (req, res) => {
  if (req.params.id) {
    await Keynote.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  }
};

//update a keynote
const updateKeynote = async (req, res) => {
  try {
    if (req.body && req.params.id) {
      await Keynote.findByIdAndUpdate(req.params.id, { $set: req.body })
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

//delete a keynote
const deleteKeynote = async (req, res) => {
  try {
    if (req.params.id) {
      await Keynote.findByIdAndDelete(req.params.id)
        .then((data) => {
          res.status(200).send({ data: data, message: "Successfully deleted" });
        })
        .catch((error) => {
          res.status(500).send({ error: error, message: "Delete failed" });
        });
    }
  } catch (error) {
    res.send({ error: error });
  }
};

//get approved keynotes
const getApprovedKeynotes = async (req, res) => {
  await Keynote.find({ is_approved: true })
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
};

//get pending keynotes
const getPendingKeynotes = async (req, res) => {
  await Keynote.find({ is_approved: false })
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
};

//send an email to admin
const sendEmailToAdmin = async (req, res) => {
  try {
    var transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: "sunshine4payments@gmail.com", pass: "Sunshine1@AB" },
    });
    var mailOptions = {
      from: "sunshine4payments@gmail.com",
      to: "tharushadilmith99@gmail.com",
      subject: "ICAF",
      text: "You have new keynote to approve!",
    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send({ message: "Email sent" });
      }
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  deleteKeynote,
  getAllKeynotes,
  updateKeynote,
  addKeynote,
  getApprovedKeynotes,
  getPendingKeynotes,
  getKeynoteByID,
  sendEmailToAdmin,
  countKeynotes
};
