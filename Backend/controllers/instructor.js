const express = require("express");
const {getVideoDurationInSeconds} = require("get-video-duration")
const router = express();

const { validateToken } = require("../middlewares/validateTokent");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const admin = require("../model/admin");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

var bcrypt = require("bcryptjs");
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const { uploadFile } = require("../middlewares/s3");
const { google } = require("googleapis");

const CLIENT_ID ="187739379566-v76oa7g2j5nuhamtc8969cpgakq6gvtl.apps.googleusercontent.com"
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04y7VqsoQzm6QCgYIARAAGAQSNwF-L9IrrQrkiNYWANkL2Kqe-HzxcTTNUxyqskI0vIl6bxzeUk8WBAb3d8kCNaN0DYQMUNfCCGY"

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});
// console.log(__dirname);
// const KEYFILEPATH = path.join(__dirname, "credentials.json");
// console.log(KEYFILEPATH);
// const SCOPES = ["https://www.googleapis.com/auth/drive"];
 
// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

const dotenv = require("dotenv");

dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

const tloginfun = async (req, res) => {
  // console.log(req.body);
  try {
    await instructors
      .findOne(
        { email: req.body.email },
        { _id: 1, name: 1, email: 1, uploadpicture: 1, password: 1 }
      )
      .then((data) => {
        // console.log(data, req.body);

        if (req.body.email == "") {
          res.status(404);
          res.send("Please enter valid email.");
        }
        else if(req.body.password == "") {
          res.status(405);
          res.send("Please enter valid password.");
        }else if (data == null) {
          res.status(406);
          res.send("The email is not registered. Please Register.");
        } 
        else if (bcrypt.compareSync(req.body.password, data.password)) {
          var hash = bcrypt.hashSync(req.body.password,10)
          const accessToken = jwt.sign(
            {
              user: {
                username: req.body.email,

                password: hash,
              },
            },

            process.env.TOKEN1,

            { expiresIn: "50m" }
          );

          // console.log(req.body);

          res.send([accessToken, data]);
        } 
        else {
          res.status(405);
          res.send("Wrong password");
        }
      });
  } catch (error) {
    res.status(403);
    res.send("User email is not registered. Please register");
  }
};

const tchangePassword = async (req, res) => {
  var hash = bcrypt.hashSync(req.body.password,10)
  try {
    var teacher = await instructors.findOne({ email: req.body.email });

    if (bcrypt.compareSync(req.body.password, data.password)) {
      await instructors.updateOne(
        { email: req.body.email },

        { $set: { password: hash } }
      );
    }

    res.send(await instructors.findOne({ email: req.body.email }));
  } catch (error) {
    console.log(error);
  }
};

const taddtoBookmark = async (req, res) => {
  try {
    await courses.findByIdAndUpdate(req.headers.id, {
      $set: { tbookmark: true },
    });
  } catch (error) {
    console.log(error);
  }
};

const profilepicture = async (req, res) => {
  try {
    var uploadpicture;
    if (req.file) {
      var file = req.file;

       uploadpicture = generateFileName();

      const tem = await uploadFile(file.buffer, uploadpicture, file.mimetype);

      uploadpicture =
        "https://learnx.s3.us-east-2.amazonaws.com/" +
        uploadpicture;
    }
      await instructors.findOneAndUpdate(
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
  } catch (error) {
    console.log(error);
  }
};

const tremovefromBookmark = async (req, res) => {
  try {
    await courses.findByIdAndUpdate(req.headers.id, {
      $set: { tbookmark: false },
    });
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

const tuserdetails = async (req, res) => {
  try {
    var userdetails = await instructors.findOne({ email: req.headers.email });

    res.send(userdetails);
  } catch (error) {
    console.log(error);
  }
};


const chart1 = async (req, res, next) => {
  var a = await courses.aggregate([
    {
      $group: {
        _id: {
          uploaded: "$uploaded",
          ratings: "$ratings",
          coursename: "$name",
          type: "$type",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.uploaded",
        category: {
          $push: {
            uploaded: "$_id.type",
            coursename: "$_id.coursename",
            ratings: "$_id.ratings",
          },
        },
        totalGeneral: { $sum: "$count" },
      },
    },
  ]);
  console.log(a);
  res.send(a);
};

const chart2 = async (req, res, next) => {
  var a = await courses.aggregate([{ $match: {} }]);
  console.log(a);
  res.send(a);
};

const chart3 = async (req, res, next) => {
  var a = await courses.aggregate([
    {
      $group: {
        _id: {
          course: "$name",
          uploaded: "$uploaded",
          type: "$type",
          ratings: "$ratings",
        },
      },
    },
    {
      $group: {
        _id: "$_id.course",
        category: {
          $push: {
            uploaded: "$_id.uploaded",
            ratings: "$_id.ratings",
          },
        },
      },
    },
  ]);

  console.log(a);
  res.send(a);
};

const Joi = require("joi");
const { response } = require("express");
function validateUser(user) {
  const JoiSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),

    email: Joi.string().email().min(5).max(50).required(),

    password: Joi.string().alphanum().min(6).max(30).required(),
  }).options({ abortEarly: false });
  return JoiSchema.validate(user);
}

const tregisterfun = async (req, res) => {
  // var response = validateUser(req.body);
  // if(response.error) {
  //   res.send(response.error.details);
  // }
  // else {
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const k = await instructors.findOne({email: req.body.email})
    if(k== null) {
    var salt = bcrypt.genSaltSync(10);

    var hash = bcrypt.hashSync(req.body.password, salt);
    const lrs = new instructors({
      name: req.body.name,

      email: req.body.email,

      password: hash,

      progress: [],

      bought: [],
    });

    lrs.save();

    res.send(req.body);
  }
  else {
    res.status(404);
    res.send();
  }
  } catch (error) {
    res.status(404);
    res.send();
  // }
};
};


const fun = async (req, res) => {
  try {
    console.log("ack");
  } catch (error) {
    console.log(error);
  }
};

const treaddlist = async (req, res) => {
  // console.log(req.headers.name);

  courses

    .findOneAndUpdate(
      { name: req.body.name },

      {
        description: req.body.description,

        prerequisites: req.body.prerequisites,

        price: req.body.price,

        uploaded: req.body.uploaded,

        modules: req.body.modules,

        videos: req.body.videos,

        quiz: req.body.quiz,

        students: [],

        type: req.body.type,

        status: true,
      }
    )

    .then(() => console.log("updated"));
};

const taddlist = async (req, res) => {
  console.log(req.body);
  var files = req.files;
  var upload_videos = [];
  var times = [];
  // console.log(files);
  for (i in files) {
    getVideoDurationInSeconds(files[i].path).then((dur)=>{
      times.push(dur)
    })
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
  console.log(times);
  var ques = req.body;
  var attr = Object.keys(ques);
  function isQues(ele) {
    if (ele.startsWith("question-")) return true;
  }
  // console.log(ques);
  var quesAns = attr.filter(isQues);
  // console.log(quesAns.sort());
  question = [];
  var temp = [];
  for(let i = 0; i <(quesAns.length);i+=6){
    question.push({
      questionText : ques[quesAns.sort()[i]],
      options : [ques[quesAns.sort()[i+2]],ques[quesAns.sort()[i+3]],ques[quesAns.sort()[i+4]],ques[quesAns.sort()[i+5]]],
      correctAnswer : ques[quesAns.sort()[i+1]]
    });
  }
  // console.log(question);

  try {
    //logs
    const cors = new courses({
      name: req.body.cname,

      description: req.body.cdes,

      prerequisites: req.body.cpreq,

      price: req.body.cprice,

      uploaded: req.body.teacher_name,

      modules: req.body.mname,

      videos: upload_videos,

      times : times,

      quiz: req.body.quiz,

      students: [],

      type: req.body.typ,
      status : false,
      averagerating : 0,
      tbookmark : false,
      adbookmark : false,
      test_name : req.body.testName,
      test_description : req.body.testDescription,
      questions : question

    });

    cors.save();
  } catch (error) {
    console.log(error);
  }
};

const forgetps = async (req, res) => {
  // console.log(req.body);
  var userd = await instructors.findOne({ email: req.body.email });
  if (userd != null) {
    // console.log(userd);
    var otp = Math.random() * 1000000;
    res.send([
      Math.round(otp),
      {
        name: userd.name,
        email: userd.email,
      },
    ]);
  } else {
    res.send("347");
  }
};
const setpwd = (req, res) => {
  var hash = bcrypt.hashSync(req.body.password,10)
  instructors.findOne({ email: req.body.email }).then((data) => {
    var pwd = instructors
      .findOneAndUpdate(
        { email: req.body.email },
        { password: hash }
      )
      .then((data) => {
        res.send(["success", req.body.email, req.body.password]);
      });
    // console.log(pwd);
  });
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

const gaddlistimp = async(req, res) => {
  const { body, files } = req;
  // console.log("yashhhhhhh", req.body);

  for (let f = 0; f < files.length; f += 1) {
    if(req.body.name != "") {
    await uploadddd(files[f], req.body.name);
    }
  }

  console.log(body);
}

const aaddlistimp = async (req, res) => {
  var files = req.files;

  var upload_videos = [];

  for (i in files) {
    var uploadvideo = generateFileName();
    var temp  = fs.createReadStream(files[i].path)
    const tem = await uploadFile(
      temp,

      uploadvideo,

      files[i].mimetype,


    );

    upload_videos[i] =
      "https://learnx.s3.us-east-2.amazonaws.com/" + uploadvideo;
  }
  try {
    // console.log("yashuuuuuuuuuuuuuuuu",req.body);
    // console.log(req.body.name);
    console.log(req.files);
    await courses

    .findOneAndUpdate(
      { name: req.body.coname },

      {
       $push: { important_files: upload_videos }
      }
    )
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  tloginfun,

  tuserdetails,

  tregisterfun,

  taddlist,

  taddtoBookmark,

  tremovefromBookmark,

  deleteUsers,

  fun,

  treaddlist,

  profilepicture,

  tchangePassword,
  forgetps,
  setpwd,

  aaddlistimp,

  gaddlistimp,

  chart1,

  chart2,

  chart3,
};
