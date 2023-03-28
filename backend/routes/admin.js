const express = require("express");
const router = express.Router();
const path = require("path");
const admincon = require("../controllers/admin");

const { validateToken } = require("../middlewares/validateToken");
const { preventToken } = require("../middlewares/preventToken");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { auserdetails, aloginfun } = require("../controllers/admin");

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

router.get("/adindex", validateToken, admincon.auserdetails);
router.get("/abookmark", validateToken, admincon.auserdetails);
router.get("/adcourses", validateToken, admincon.auserdetails);
router.get("/add-courses", validateToken, admincon.auserdetails);
router.get("/areview", validateToken, admincon.auserdetails);
router.get("/user-profile", validateToken, admincon.auserdetails);
router.get("/admin-home-i", fetchi, (req, res) => {
  res.send(req.resulti);
});
router.get("/admin-home-l", fetchl, (req, res) => {
  res.send(req.resultl);
});
router.get("/deleteUI", admincon.deleteUsers);
router.get("/deleteCourse", admincon.deleteCourses);
router.post("/alogin", admincon.aloginfun);
module.exports = router;
