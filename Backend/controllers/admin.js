const express = require("express");

const router = express();

const path = require("path");

const { validateToken } = require("../middlewares/validateTokena");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const fs = require("fs");

const crypto = require("crypto");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const { uploadFile } = require("../middlewares/s3");

dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

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

const auserdetails = async (req, res) => {
  try {
    var userdetails = await admin.findOne({ email: req.headers.email });

    res.send(userdetails);
  } catch (error) {
    console.log(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    if (req.headers.email.endsWith("@gmail.com")) {
      courses

        .updateOne({}, { $pull: { students: { email: req.headers.email } } })

        .then(console.log());

      await learners.findOneAndRemove({ email: req.headers.email });
    } else {
      courses

        .findOneAndRemove({ uploaded: req.headers.email })

        .then(console.log());

      await instructors.findOneAndRemove({ email: req.headers.email });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCourses = async (req, res) => {
  try {
    learners

      .updateMany({}, { $pull: { bought: req.headers.name } })

      .then(res.send("437"));

    await courses.findOneAndRemove({ name: req.headers.name });
  } catch (error) {
    console.log(error);
  }
};

const adaddtoBookmark = async (req, res) => {
  try {
    await courses.findByIdAndUpdate(req.headers.id, {
      $set: { adbookmark: true },
    });
  } catch (error) {
    console.log(error);
  }
};

const adremovefromBookmark = async (req, res) => {
  try {
    await courses.findByIdAndUpdate(req.headers.id, {
      $set: { adbookmark: false },
    });
  } catch (error) {
    console.log(error);
  }
};

const chart1 = async (req, res, next) => {
  var a = await courses.aggregate([
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);
  console.log(a);
  res.send(a);
};

const chart2 = async (req, res, next) => {
  var a = await courses.aggregate([{ $match: {} }]);
  console.log(a);
  res.send(a);
};

const bcrypt = require("bcryptjs");
const aloginfun = async (req, res) => {
  try {
    admin
      .findOne(
        { email: req.body.email },
        { _id: 1, name: 1, email: 1, uploadpicture: 1, password: 1 }
      )
      .then((data) => {
        if (req.body.email == "") {
          res.status(404);
          res.send("Please enter valid email");
        } else if (req.body.password == "") {
          res.status(405);
          res.send("Please enter valid password");
        } else if (data == null) {
          res.status(406);
          res.send("The email is not registered. Please Register.");
        } 
        else if (bcrypt.compareSync(req.body.password, data.password)) {
          var hash = bcrypt.hashSync(req.body.password, 10);
          const accessToken = jwt.sign(
            {
              user: {
                username: req.body.email,

                password: hash,
              },
            },

            process.env.TOKEN2,

            { expiresIn: "50m" }
          );

          res.send([accessToken, data]);
        } else {
          res.status(400);
          res.send("wrong passowrd");
        }
      });
  } catch (error) {
    console.log(error);
    res.status(403);
  }
};

const taddlist = async (req, res) => {
  var files = req.files;

  var upload_videos = [];

  for (i in files) {
    var uploadvideo = generateFileName();
    var temp = fs.createReadStream(files[i].path);
    const tem = await uploadFile(
      temp,

      uploadvideo,

      files[i].mimetype
    );

    upload_videos[i] =
      "https://learnx.s3.us-east-2.amazonaws.com/" + uploadvideo;
  }

  try {
    const cors = new courses({
      name: req.body.cname,

      description: req.body.cdes,

      prerequisites: req.body.cpreq,

      price: req.body.cprice,

      uploaded: req.body.teacher_name,

      modules: req.body.mname,

      videos: upload_videos,

      quiz: req.body.quiz,

      students: [],

      type: req.body.typ,
      status: true,
      averagerating: 0,
      tbookmark: false,
      adbookmark: false,
    });

    cors.save();
  } catch (error) {
    console.log(error);
  }
};

const achangePassword = async (req, res) => {
  try {
    var admin1 = await admin.findOne({ email: req.body.email });

    if (admin1.password === req.body.password) {
      await admin.updateOne(
        { email: req.body.email },

        { $set: { password: req.body.newpassword } }
      );
    }

    res.send(await admin.findOne({ email: req.body.email }));
  } catch (error) {
    console.log(error);
  }
};

const profilepicture = async (req, res) => {
  try {
    if (req.file) {
      var file = req.file;

      var uploadpicture = generateFileName();

      const tem = await uploadFile(file.buffer, uploadpicture, file.mimetype);

      uploadpicture =
        "https://learnx.s3.us-east-2.amazonaws.com/" + uploadpicture;

      await admin.findOneAndUpdate(
        { email: req.body.aemail },

        {
          $set: {
            name: req.body.aname,

            uploadpicture: uploadpicture,

            occupation: req.body.aoccu,

            companyName: req.body.acom,

            PhoneNo: req.body.aphon,

            address: req.body.aadd,

            city: req.body.acity,

            state: req.body.astate,

            postcode: req.body.apost,

            linkedin: req.body.alikd,

            facebook: req.body.afb,

            twitter: req.body.atwt,

            instagram: req.body.ainst,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const adapprove = async (req, res) => {
  courses

    .updateOne({ name: req.headers.name }, { $set: { status: true } })

    .then((data) => console.log("updated"));
};

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const uploadddd = async (fileObject, id) => {
  const bufferStream = fs.createReadStream(fileObject.path);
  // bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [id],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

const gaddlistimp = async (req, res) => {
  const { body, files } = req;
  console.log("yashhhhhhh", req.body);

  for (let f = 0; f < files.length; f += 1) {
    if (req.body.name != "") {
      await uploadddd(files[f], req.body.name);
    }
  }

  console.log(body);
};

const aaddlistimp = async (req, res) => {
  var files = req.files;

  var upload_videos = [];

  for (i in files) {
    var uploadvideo = generateFileName();
    var temp = fs.createReadStream(files[i].path);
    const tem = await uploadFile(
      temp,

      uploadvideo,

      files[i].mimetype
    );

    upload_videos[i] =
      "https://learnx.s3.us-east-2.amazonaws.com/" + uploadvideo;
  }
  try {
    // console.log("yashuuuuuuuuuuuuuuuu",req.body);
    console.log(req.body.name);
    console.log(req.files);
    await courses.findOneAndUpdate(
      { name: req.body.coname },

      {
        $push: { important_files: upload_videos },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  auserdetails,

  aloginfun,

  deleteUsers,

  deleteCourses,

  adaddtoBookmark,

  adremovefromBookmark,

  taddlist,

  profilepicture,

  achangePassword,

  adapprove,

  chart1,

  chart2,

  aaddlistimp,

  gaddlistimp,
};
