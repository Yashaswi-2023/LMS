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

const limpuser = async (req, res) => {
  var userdetails = await learners.findOne({ email: JSON.parse(req.headers.email).email, });
  res.send(userdetails);
}
const luserdetails = async (req, res) => {
  var userdetails = await learners.findOne({ email: req.headers.email });
  res.send(userdetails);
}

const lloginfun = async (req, res) => {
  learners.findOne({ email: req.body.email }).then((data) => {
    // console.log(data, req.body);
    if (data == null) {
      res.send("user not registered");
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
      // console.log(req.body);
      res.send([accessToken, data]);
    } else {
      res.send("wrong passowrd");
    }
  });
}

const lregisterfun = async (req, res) => {
  const lrs = new learners({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  lrs.save();
  res.send();
}
const lchangePassword = async (req, res) => {

  var learner = await learners.findOne({ email: req.body.email });

  if (learner.password === req.body.password) {

    await learners.updateOne(

      { email: req.body.email },

      { $set: { password: req.body.newpassword } }

    );

  }

  res.send(await learners.findOne({ email: req.body.email }));

}
const lprogressupd = async (req, res) => {
  // console.log(req.headers);
  var myprog = {
    mid: req.headers.moduleid,
    status: 1,
  };
  learners.findOneAndUpdate({ _id: JSON.parse(req.headers.email)._id }, { $push: { progress: myprog } }).then(
    console.log("updated learners")
  )
}
const lcoursedetails = async (req, res) => {
  learners.findOne({ email: req.body.stud_id }).then((data) => {
    var mydata = {
      _id: data._id,
      name: data.name,
      email: data.email,
    };
    courses
      .findOneAndUpdate(
        {
          _id: req.body.corid,
          students: {
            $ne: mydata,
          },
        },
        { $push: { students: mydata } },
        { new: true }
      )
      .then(console.log("updated courses"));
  });
  courses.findOne({ _id: req.body.corid }).then((data) => {
    var mydata = {
      _id: data._id,
      name: data.name,
      description: data.description,
      prerequisites: data.prerequisites,
      modules: data.modules,
      videos: data.videos,
      quiz: data.quiz,
      type: data.type,
      uploaded: data.uploaded,
    }
    learners.findOneAndUpdate({
      email: req.body.stud_id,
      bought: {
        $ne: mydata,
      },
    },
      { $push: { bought: mydata } },
      { new: true },
    ).then(
      console.log("updated leaners")
    )
  })
}
const progdet = async (req, res) => {
  console.log(req.headers);
  learners.findOne({
    _id: JSON.parse(req.headers.email)._id
  }).then((data) => {
    res.send(data)
  })
}

module.exports = { luserdetails, lloginfun, lregisterfun, lcoursedetails, limpuser, lprogressupd, progdet,lchangePassword }