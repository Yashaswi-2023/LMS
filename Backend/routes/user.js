const express = require("express");
const router = express.Router();
const cors = require("cors");
const usercon = require("../controllers/user");
const { validateToken } = require("../middlewares/validateToken");
const { preventToken } = require("../middlewares/preventToken");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require("multer");

const upload_cvideos = multer({ dest: "./uploads" });

const upload_ppicture = multer({ dest: "./profileuploads" });

const { uploadS3 } = require("../middlewares/uploads3");

dotenv.config();
router.use(cors());
const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

router.get("/lprofile", validateToken, usercon.limpuser);
router.get("/lindex", preventToken);
router.get("/llogin", preventToken);
router.get("/lprogress", usercon.lprogressupd);
router.get("/addRatings", usercon.lratings);
router.get("/forget-password", usercon.luserdetails);
router.get("/lcourses", async (req, res) => {});
router.get("/courses-details", usercon.luserdetails);
router.get("/course-buy", validateToken, usercon.luserdetails);
router.get("/lc123", validateToken, usercon.compileraccess);
router.get("/compiler", validateToken, usercon.compileraccess);
router.get("/faculty-det", fetchfac, (req, res) => {
  res.send(req.resdet);
});
router.get("/notestook", usercon.notestook);
router.get("/course-stud", async (req, res) => {
  var data = [];
  // courses.find({}).then((crs)=>{
  //   data.push(crs)
  // })
  // learners.find({}).then((stud)=>{
  //   data.push(stud)
  // })
  data.push(await courses.find({}));
  data.push(await learners.find({}));

  // console.log(data);
  res.send(data);
});
router.get("/getImage", async (req, res) => {
  // console.log(req.headers.email);
  imgs = [];
  emails = req.headers.email.split(",");
  for (i in emails) {
    data = await learners.findOne({ email: emails[i] }, { uploadpicture: 1 });
    if(data != null) {
    var mydat = {};
    mydat[emails[i]] = data.uploadpicture;
    imgs.push(mydat);
    }
  }
  // console.log(imgs);
  res.send(imgs);
});

router.post("/addtask", usercon.addtask);
router.post("/donetask", usercon.donetask);
router.post("/savenotes", usercon.savenotes);
router.post("/llogin", usercon.lloginfun);
router.post("/lprofile", usercon.lchangePassword);
router.post("/deleteNotes", usercon.deleteNotes);
router.post("/lregister", usercon.lregisterfun);
router.post("/ksk", (req, res) => {
  learners
    .findOne(
      { _id: req.body.id },
      { _id: 1, name: 1, email: 1, uploadpicture: 1 }
    )
    .then((data) => {
      if (data) {
        const accessToken = jwt.sign(
          {
            user: {
              username: data.email,
              password: data.password,
            },
          },
          process.env.TOKEN,
          { expiresIn: "50m" }
        );
        res.send([accessToken, data]);
      }
    });
});
router.post("/lcourses", async (req, res) => {});
router.post(
  "/lprofile_changeProfile",
  uploadS3.single("apic"),
  usercon.profilepicture
);
router.post("/courses-details", validateToken, usercon.lcoursedetails);
// router.get("/route", usercon.route);
router.post("/submitreview", usercon.submitreview);
router.post("/forgetps", usercon.forgetps);
router.post("/SetPassword", usercon.setpwd);
router.post("/validateAnswers", async (req, res) => {

  var response = req.headers.response;
 
  var data = (
 
   await courses.findOne(
 
    { _id: req.headers.courseid },
 
    { questions: 1, _id: 0 }
 
   )
 
  ).questions;
 
  // console.log(data, response);
 
  response = JSON.parse(response);
 
  var score1 = 0;
 
  // for(i of response){
 
  // var crct = data.findOne({_id : i},{correctanswer: 1})
 
  // }
 
  for (i in data) {
 
   // console.log(response[data[i]._id], parseInt(data[i].correctAnswer) - 1);
 
   if (
 
    response[data[i]._id] &&
 
    response[data[i]._id] == parseInt(data[i].correctAnswer) - 1
 
   ) {
 
    score1++;
 
   }
 
  }
 
  // console.log(score1);
 
  var crsId = req.headers.courseid;
 
  var studId = req.headers.studentid;
 
  // console.log(req.headers);
 
  var scorejson = {};
 
 
 
  learners.findById(studId).then((data) => {
 
   var flag = false;
 
   for (i in data.score) {
 
    // console.log(Object.keys(data.score[i]), crsId);
 
    if (Object.keys(data.score[i])[0] == crsId) {
 
     // res.send("already attempted");
 
     flag = true;
 
    }
 
   }
 
   if (!flag) {
 
    scorejson[crsId] = score1;
 
    console.log("crs");
 
    if (!data.score || data.score.length == 0) {
 
     learners
 
      .updateOne({ _id: studId }, { $set: { score: scorejson } })
 
      .then(console.log());
 
    } else {
 
     learners
 
      .updateOne({ _id: studId }, { $push: { score: scorejson } })
 
      .then(console.log());
 
    }
 
   }
 
  });
 
  var userjson = {};
 
 
 
  courses.findById(crsId).then((data) => {
 
   var flag = false;
 
   for (i in data.scores) {
 
    if (Object.keys(data.scores[i])[0] == studId) {
 
     // res.send();
 
     flag = true;
 
    }
 
   }
 
   if (!flag) {
 
    userjson[studId] = score1;
 
    console.log(stud);
 
    if (!data.scores || data.scores.length == 0) {
 
     courses
 
      .updateOne({ _id: crsId }, { $set: { scores: userjson } })
 
      .then(console.log());
 
    } else {
 
     courses
 
      .updateOne({ _id: crsId }, { $push: { scores: userjson } })
 
      .then(console.log());
 
    }
 
   }
 
  });
 
  res.send("success");
 
 });
router.get("/getQues", async (req, res) => {
  // console.log(req.headers);
  var data = await courses.findOne(
    { _id: req.headers.courseid },
    { questions: 1 }
  );
  res.send(data);
});

router.get("/getCourse", async (req, res) => {

  await courses.findOne({ _id: req.headers.corid }).then((data) => {
 
   res.send(data);
 
  });
 
 });
module.exports = router;
