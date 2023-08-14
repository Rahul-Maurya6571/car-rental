const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const Agency = mongoose.model("Agency");
// const {JWT_SECRET} = require("../keys")

router.post("/registeruser", (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body)
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(401).json({ error: "Email is already taken" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: `${name} registered successfully` });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((error) => console.log(error));
});

router.post("/registeragency", (req, res) => {
  const { agencyName, agencyEmail, password } = req.body;
  // console.log(req.body)
  Agency.findOne({ agencyEmail: agencyEmail })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(401).json({ error: "Email is already taken" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new Agency({
          agencyName: agencyName,
          agencyEmail: agencyEmail,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: `${agencyName} registered successfully` });
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((error) => console.log(error));
});

router.post("/usersignin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt.compare(password, savedUser.password).then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        const { _id, name, email } = savedUser;
        return res.json({
          token: token,
          user: { _id, name, email },
          message: `${email} Signin successfully`,
        });
      } else {
        return res.status(422).json({ error: "Invalid email or password" });
      }
    });
  });
});

router.post("/agencysignin", (req, res) => {
  const { agencyEmail, password } = req.body;
  // console.log(req.body)
  Agency.findOne({ agencyEmail: agencyEmail }).then((savedUser) => {
    // console.log(savedUser)
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt.compare(password, savedUser.password).then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        const { _id, agencyName, agencyEmail } = savedUser;
        return res.json({
          token: token,
          user: { _id, agencyName, agencyEmail },
          message: `${agencyEmail} Signin successfully`,
        });
      } else {
        return res.status(422).json({ error: "Invalid email pr password" });
      }
    });
  });
});

module.exports = router;
