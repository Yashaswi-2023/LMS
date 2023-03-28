const express = require("express");
const router = express();

const { validateToken } = require("../middlewares/validateToken");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

const auserdetails = async (req, res) => {
  var userdetails = await admin.findOne({ email: req.headers.email });
  res.send(userdetails);
};

const aloginfun = async (req, res) => {
  admin.findOne({ email: req.body.email }).then((data) => {
    if (data == null) {
      res.send("admin not present");
    } else if (data.password === req.body.password) {
      const accessToken = jwt.sign(
        {
          user: {
            username: req.body.email,
            password: req.body.password,
          },
        },
        process.env.TOKEN,
        { expiresIn: "50m" }
      );
      res.send([accessToken, data]);
    } else {
      res.send("wrong passowrd");
    }
  });
};

const deleteUsers = async (req, res) => {
  if (req.headers.email.endsWith("@gmail.com")) {
    await learners.findOneAndRemove({ email: req.headers.email });
  } else {
    await instructors.findOneAndRemove({ email: req.headers.email });
  }
};

const deleteCourses = async (req, res) => {
  await courses.findOneAndRemove({ _id: req.headers.id });
};

module.exports = { auserdetails, aloginfun, deleteCourses, deleteUsers };
