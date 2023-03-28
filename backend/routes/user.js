const express = require("express");
const router = express.Router();

const usercon = require("../controllers/user");
const { validateToken } = require("../middlewares/validateToken")
const { preventToken } = require("../middlewares/preventToken")

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch"); 

router.get("/profile", validateToken, usercon.limpuser)
router.get("/lindex", preventToken);
router.get("/lprogress",usercon.lprogressupd)
router.get("/forget-password", usercon.luserdetails);
router.get("/lcourses", async (req, res) => {
  
});
router.get("/progress-det",usercon.progdet);
router.get("/courses-details", validateToken, usercon.luserdetails);
router.get("/course-buy", validateToken, usercon.luserdetails);
router.get("/faculty-det", fetchfac, (req, res) => {
  res.send(req.resdet);
});

router.post("/llogin", usercon.lloginfun);
router.post("/lprofile", usercon.lchangePassword);
router.post("/lregister", usercon.lregisterfun);

router.post("/lcourses", async (req, res) => {});

router.post("/courses-details", usercon.lcoursedetails);

module.exports = router 