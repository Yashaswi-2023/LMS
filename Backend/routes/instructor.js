const express = require("express");
const router = express();

const { validateToken } = require("../middlewares/validateTokent");
const instcon = require("../controllers/instructor");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require("multer")
dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");
const { preventToken } = require("../middlewares/preventTokent");

const crypto = require("crypto");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
  const { google } = require("googleapis");

  const CLIENT_ID =
    "187739379566-v76oa7g2j5nuhamtc8969cpgakq6gvtl.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04y7VqsoQzm6QCgYIARAAGAQSNwF-L9IrrQrkiNYWANkL2Kqe-HzxcTTNUxyqskI0vIl6bxzeUk8WBAb3d8kCNaN0DYQMUNfCCGY";
  
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  // console.log(__dirname);
  // const KEYFILEPATH = path.join(__dirname, "credentials.json");
  // console.log(KEYFILEPATH);
  // const SCOPES = ["https://www.googleapis.com/auth/drive"];
  
  // const auth = new google.auth.GoogleAuth({
  //   keyFile: KEYFILEPATH,
  //   scopes: SCOPES,
  // });
  
const { uploadFile } = require("../middlewares/s3");

const { uploadS3 } = require("../middlewares/uploads3");

const upload_cvideos = multer({ dest: "./uploads" });

router.get("/faculty-det", fetchfac, (req, res) => {
  res.send(req.resdet);
});
router.get("/tlogin", preventToken, instcon.fun);
router.get("/tindex", validateToken, instcon.tuserdetails);
router.get("/tcourses", validateToken, instcon.tuserdetails);
router.get("/treview", validateToken, instcon.tuserdetails);
router.get("/tbookmark", validateToken, instcon.tuserdetails);
router.get("/tcourses", validateToken, instcon.tuserdetails);
router.get("/teacher-profile", validateToken, instcon.tuserdetails);
router.get("/add-listing", validateToken, instcon.tuserdetails);
router.get("/edit-listing", validateToken, instcon.tuserdetails);
router.get("/taddtoBookmark", instcon.taddtoBookmark);
router.get("/tchat1", validateToken, instcon.tuserdetails);
router.get("/tremovefromBookmark", instcon.tremovefromBookmark);
router.post("/add-listing", instcon.taddlist);
router.post("/readd-listing", instcon.treaddlist);
// router.post("/add-course",upload.single("mvideo"),instcon.taddlist);
router.post("/tlogin", instcon.tloginfun);
router.post("/ksk1", (req, res) => {
  instructors.findOne({ _id: req.body.id },{_id : 1,name : 1,email : 1,uploadpicture:1}).then((data) => {
    const accessToken = jwt.sign(
      {
        user: {
          username: data.email,
          password: data.password,
        },
      },
      process.env.TOKEN1,
      { expiresIn: "50m" }
    );
    res.send([accessToken, data]);
  });
});
router.post(
  "/teacher-profile_changeProfile",
  uploadS3.single("apic"),
  instcon.profilepicture
);



router.get("/tchart1", instcon.chart1);

router.get("/tchart2", instcon.chart2);
router.get("/tchart3", instcon.chart3);
router.post("/upload-files-t", upload_cvideos.array("mvid"), instcon.taddlist);
router.post("/teacher-profile", instcon.tchangePassword);
router.post("/tregister", instcon.tregisterfun);
router.post("/tforgetps", instcon.forgetps);
router.post("/tupload-files-imp", upload_cvideos.array("ifile"), instcon.aaddlistimp);
router.post("/tupload-files-imp2", upload_cvideos.array("ifile"), instcon.gaddlistimp);
router.post("/tSetPassword",instcon.setpwd);
module.exports = router;
