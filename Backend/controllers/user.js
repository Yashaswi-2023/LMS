const express = require("express");

const router = express();

const { validateToken } = require("../middlewares/validateToken");

const courses = require("../model/courses");

const learners = require("../model/user");

const instructors = require("../model/instructors");

const crypto = require("crypto");

var bcrypt = require("bcryptjs");

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const { uploadFile } = require("../middlewares/s3");

const admin = require("../model/admin");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const { fetchl, fetchi, fetchfac } = require("../middlewares/fetch");

const limpuser = async (req, res) => {
  try {
    var userdetails = await learners.findOne({
      email: JSON.parse(req.headers.email).email,
    });

    res.send(userdetails);
  } catch (error) {
    res.send(405);
  }
};

const luserdetails = async (req, res) => {
  try {
    var userdetails = await learners.findOne({ email: req.headers.email });

    res.send(userdetails);
  } catch (error) {}
};

const compileraccess = async (req, res) => {
  try {
    var compiler = await learners.findOne(
      { email: req.headers.email },
      { bought: 1 }
    );
    // console.log(compiler);
    res.send(compiler);
  } catch (error) {
    console.log();
  }
};

const profilepicture = async (req, res) => {
  // console.log(req.body.aemail);
  try {
    // learners.findOne({}).then(data=>{
    //   console.log(data)
    // })
    var uploadpicture;
    if (req.file) {
      var file = req.file;

      uploadpicture = generateFileName();
      const tem = await uploadFile(file.buffer, uploadpicture, file.mimetype);

      uploadpicture =
        "https://learnx.s3.us-east-2.amazonaws.com/" + uploadpicture;
    }
      
      await learners.findOneAndUpdate(
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
    console.log();
  }
};

const lratings = async (req, res) => {
  try {
    courses.findOne({ name: req.headers.name }).then((data) => {
      var k = 0;

      var rcount = 0;

      var total_rating = 0;

      for (i in data.ratings) {
        rcount = rcount + 1;

        total_rating = total_rating + data.ratings[i].ratings;

        if (data.ratings[i].given_by === req.headers._id) {
          k = 1;
          var datar = {
            ratings: parseInt(req.headers.ratings),

            given_by: req.headers._id,
          };
          total_rating = 0;
          total_rating = total_rating + parseInt(req.headers.ratings);

          var average_rating = total_rating / rcount;

          courses

            .findOneAndUpdate(
              { name: req.headers.name },

              { $set: { ratings: datar } }
            )

            .then(console.log("updated courses"));

          courses
            .findOneAndUpdate(
              { name: req.headers.name },

              { $set: { averagerating: average_rating } }
            )
            .then(console.log("added avg"));
        }
      }

      var datar = {
        ratings: parseInt(req.headers.ratings),

        given_by: req.headers._id,
      };

      if (k == 0) {
        total_rating = total_rating + parseInt(req.headers.ratings);

        rcount = rcount + 1;

        var average_rating = total_rating / rcount;

        courses

          .findOneAndUpdate(
            { name: req.headers.name },

            { $push: { ratings: datar } }
          )

          .then(console.log("updated courses"));

        courses
          .findOneAndUpdate(
            { name: req.headers.name },

            { $set: { averagerating: average_rating } }
          )
          .then(console.log("added avg"));

        res.send(data.ratings);
      }
    });
  } catch (error) {}
};

const submitreview = async (req, res) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;

    courses.findOne({ name: req.body.name }).then((data) => {
      // console.log(data);

      var k = 0;

      if (data.reviews) {
        for (i in data.reviews) {
          if (data.reviews[i].given_by === req.body.stuemail) {
            k = 1;

            courses

              .findOneAndUpdate(
                { name: req.body.name },

                {
                  $set: {
                    reviews: {
                      review: req.body.review,
                      given_by: req.body.stuemail,
                      name_reviewed: req.body.stuname,
                      date: formattedToday,
                    },
                  },
                }
              )

              .then(console.log("updated courses"));
          }
        }
      }

      var datare = {
        review: req.body.review,
        given_by: req.body.stuemail,
        name_reviewed: req.body.stuname,
        date: formattedToday,
      };

      if (k == 0) {
        courses

          .findOneAndUpdate(
            { name: req.body.name },

            { $push: { reviews: datare } }
          )

          .then(console.log("updated courses"));

        res.send(data.reviews);
      }
    });
  } catch (error) {}
};

const lloginfun = async (req, res) => {
  try {
    await learners
      .findOne(
        { email: req.body.email },
        { _id: 1, name: 1, email: 1, uploadpicture: 1, password: 1 }
      )
      .then((data) => {
        // console.log(data, req.body);

        if (req.body.email == "") {
          res.status(404);
          res.send("Please enter valid email.");
        } else if (req.body.password == "") {
          res.status(405);
          res.send("Please enter valid password.");
        } else if (bcrypt.compareSync(req.body.password, data.password)) {
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
          res.status(405);
          res.send("Wrong password");
        }
      });
  } catch (error) {
    res.status(403);
    res.send("User email is not registered. Please register");
  }
};
const deleteNotes = async (req, res) => {

  var dlt = req.body.done
 
  var dltD;
 
  await learners.findOne({email : req.body.email}).then((data)=>{
 
   dltD = Object.keys(data.notes)[dlt]
 
  })
 
  learners
 
   .findOneAndUpdate(
 
    { email: req.body.email },
 
    { $pull: { notes: {dlt : dltD} }}
 
   )
 
   .then(console.log("removed notes"));
 
 };
const lregisterfun = async (req, res) => {
  try {
    const k = await learners.findOne({ email: req.body.email });
    if (k == null) {
      var salt = bcrypt.genSaltSync(10);

      var hash = bcrypt.hashSync(req.body.password, salt);
      const lrs = new learners({
        name: req.body.name,

        email: req.body.email,

        password: hash,

        progress: [],

        bought: [],
      });

      lrs.save();

      res.send(req.body);
    } else {
      res.status(404);
      res.send();
    }
  } catch (error) {
    res.status(404);
    res.send();
  }
};

const lchangePassword = async (req, res) => {
  try {
    var learner = await learners.findOne({ email: req.body.email });
    var salt = bcrypt.genSaltSync(10);

    var hash = bcrypt.hashSync(req.body.newpassword, salt);
    if (bcrypt.compareSync(req.body.password, learner.password)) {
      await learners.updateOne(
        { email: req.body.email },

        { $set: { password: hash } }
      );
      res.status(400);
      res.send();
    } else {
      res.status(440);
      res.send();
    }
  } catch (error) {
    console.log();
  }
};

const lprogressupd = async (req, res) => {

  try {
 
   // console.log(req.headers);
 
 
 
   learners
 
 
 
    .findOne({ _id: JSON.parse(req.headers.email)._id })
 
 
 
    .then((data) => {
 
     if (!data.progress.includes(req.headers.moduleid)) {
 
      learners
 
 
 
       .findOneAndUpdate(
 
        { _id: JSON.parse(req.headers.email)._id },
 
 
 
        { $push: { progress: req.headers.moduleid } }
 
       )
 
 
 
       .then(console.log("updated learners", req.headers.moduleid));
 
     }
 
 
 
     res.send([data.progress,data.score]);
 
    });
 
  } catch (error) {
 
   console.log(error);
 
  }
 
 };

const lcoursedetails = async (req, res) => {
  // console.log(req.body,"377");
  try {
    learners.findOne({ email: req.body.stud_id }).then((data) => {
      // console.log(data,"380");
      var mydata = {
        _id: data._id,

        name: data.name,

        email: data.email,

        picture: data.uploadpicture,
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
        corid: data._id,

        name: data.name,
        uploaded: data.uploaded,
      };

      learners

        .findOneAndUpdate(
          {
            email: req.body.stud_id,

            bought: {
              $ne: mydata,
            },
          },

          { $push: { bought: mydata } },

          { new: true }
        )

        .then(console.log("updated leaners"));
    });

    res.send(req.body.corname);
  } catch (error) {
    console.log(error);
  }
};

const progdet = async (req, res) => {
  try {
    // console.log(req.headers);

    learners

      .findOne({
        _id: JSON.parse(req.headers.email)._id,
      })

      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    console.log(error);
  }
};

const addtask = async (req, res) => {
  console.log("ok");
  learners
    .findOneAndUpdate(
      { email: req.body.email },
      { $push: { todo: req.body.task } }
    )
    .then(console.log("updated tasks"));
  learners.findOne({ email: req.body.email }).then((data) => {
    res.send(data.todo);
  });
};

const donetask = async (req, res) => {
  // console.log(req.body);
  learners
    .findOneAndUpdate(
      { email: req.body.email },
      { $pull: { todo: req.body.done } }
    )
    .then(console.log("removed tasks"));
};
const savenotes = async (req, res) => {
  var title = req.headers.notes;
  var notes = req.headers.text;
  var mynotes = {};
  mynotes[title] = notes;
  learners
    .findOneAndUpdate(
      { email: req.headers.email },
      { $push: { notes: mynotes } }
    )
    .then(console.log("updated notes"));
  res.send();
};
const notestook = async (req, res) => {
  learners.findOne({ email: req.headers.email }).then((data) => {
    res.send(data.notes);
  });
};
const forgetps = async (req, res) => {
  // console.log(req.body);
  var userd = await learners.findOne({ email: req.body.email });
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
module.exports = {
  luserdetails,

  lloginfun,

  lregisterfun,

  lcoursedetails,

  limpuser,

  lprogressupd,

  progdet,

  lchangePassword,

  lratings,

  submitreview,

  profilepicture,
  addtask,
  donetask,
  savenotes,
  notestook,
  compileraccess,
  forgetps,
  setpwd,
  deleteNotes,
};
