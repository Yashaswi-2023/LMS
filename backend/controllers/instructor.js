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

const tloginfun = async (req, res) => {
  instructors.findOne({ email: req.body.email }).then((data) => {
    if (data == null) {
      res.send("instructor not registered");
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

const tuserdetails = async (req, res) => {
  // console.log("tuserdetails");
  var userdetails = await instructors.findOne({ email: req.headers.email });
  res.send(userdetails);
};

const tregisterfun = async (req, res) => {
    const trs = new instructors({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    trs.save();
    res.send();
}

const taddlist = async (req, res) => {
  const cors = new courses({
    name: req.body.name,
    description: req.body.description,
    prerequisites: req.body.prerequisites,
    price: req.body.price,
    uploaded: req.body.uploaded,
    modules: req.body.modules,
    videos: req.body.videos,
    quiz: req.body.quiz,
    students: [],
    type: req.body.type,
  });
  cors.save();
}

module.exports = { tloginfun, tuserdetails, tregisterfun, taddlist };
