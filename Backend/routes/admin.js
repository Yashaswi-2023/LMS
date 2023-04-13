const express = require("express");

const router = express.Router();

const path = require("path");

const admincon = require("../controllers/admin");

const { validateToken } = require("../middlewares/validateTokena");

const { preventToken } = require("../middlewares/preventTokena");

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

const { auserdetails, aloginfun } = require("../controllers/admin");

const {
  fetchl,
  fetchi,
  fetchfac,
  fetchadmin,
} = require("../middlewares/fetch");

router.get("/adindex", validateToken, admincon.auserdetails);
router.get("/alogin",preventToken,admincon.auserdetails);
router.get("/abookmark", validateToken, admincon.auserdetails);

router.get("/adcourses", validateToken, admincon.auserdetails);

router.get("/add-courses", validateToken, admincon.auserdetails);

router.get("/areview", validateToken, admincon.auserdetails);

router.get("/user-profile", validateToken, admincon.auserdetails);
router.get("/alogin", preventToken);
router.get("/deleteUI", admincon.deleteUsers);

router.get("/deleteCourse", admincon.deleteCourses);
router.get("/adapprove", admincon.adapprove);
router.get("/adaddtoBookmark", admincon.adaddtoBookmark);
router.get("/add-listing", validateToken, admincon.auserdetails);
router.get("/adremovefromBookmark", admincon.adremovefromBookmark);

router.get("/admin-home-i", fetchi, (req, res) => {
  res.send(req.resulti);
});
router.get("/getTeacherImage",async (req,res)=>{
  imgs = [];
  emails = req.headers.email.split(",");
  // console.log(emails);
  if(emails.length > 0)
    for (i in emails) {
      data = await instructors.findOne({ email: emails[i] }, { uploadpicture: 1 });
      if(data != undefined) {
      var mydat = {}
      mydat[emails[i]] = data.uploadpicture;
      imgs.push(mydat);
      }
    }
  // console.log(imgs);
  res.send(imgs)
})
router.get("/admin-home-l", fetchl, (req, res) => {
  // console.log(req.resultl);
  res.send(req.resultl);
});
router.get("/admin-profile", fetchadmin, (req, res) => {
  res.send(req.resultprof);
});
router.post("/add-listing", admincon.taddlist);
router.post("/add-courses", admincon.taddlist);

router.post("/alogin", admincon.aloginfun);

router.post("/user-profile", admincon.achangePassword);

router.post("/upload-files", upload_cvideos.array("mvid"), admincon.taddlist);
router.post("/aupload-files-imp", upload_cvideos.array("ifile"), admincon.aaddlistimp);
router.post("/aupload-files-imp2", upload_cvideos.array("ifile"), admincon.gaddlistimp);
router.get("/chart1", admincon.chart1);

router.get("/chart2", admincon.chart2);

router.post(
  "/user-profile_changeProfile",
  uploadS3.single("apic"),
  admincon.profilepicture
);

module.exports = router;
