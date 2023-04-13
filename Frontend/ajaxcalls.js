function submit_review(name) {
  k = document.getElementById("reviews123").value;

  $.ajax({
    type: "POST",

    url: "http://localhost:3470/submitreview",

    contentType: "application/json",

    data: JSON.stringify({
      review: k,

      name: name,

      stuemail: JSON.parse(sessionStorage.getItem("email")).email,
      stuname: JSON.parse(sessionStorage.getItem("email")).name,
    }),

    success: function (data) {
      alert("review submitted");
    },
  });

  window.location.href = "course-buy.html";
}
function savenotes() {
  var k = document.getElementById("textnotes").value;
  var notes = k.replace(/\n/g, "<br>");
  if (document.getElementById("titlenotes").value != "") {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/savenotes",
      headers: {
        email: JSON.parse(sessionStorage.getItem("email")).email,
        notes: document.getElementById("titlenotes").value,
        text: notes,
      },
      data: JSON.stringify({
        email: JSON.parse(sessionStorage.getItem("email")).email,
        notes: document.getElementById("titlenotes").value,
        text: document.getElementById("textnotes").value,
      }),
      success: function (data) {
        location.reload();
        alert("Notes Uploaded.");
      },
    });
  }
}
if (window.location.href.indexOf("lindex") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lindex",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      error: function (err, msg) {
        if (err.status == "404") window.location.href = "error-404.html";
        if (err.status == "405") window.location.href = "lprofile.html";
      },
      success: function (data) {},
    });
  });
}
if (window.location.href.indexOf("llogin") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/llogin",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      success: function (data) {},
    });
  });
}
if (window.location.href.indexOf("tlogin") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/tlogin",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      error: function (err, msg) {
        if (err.status == "405") window.location.replace("tindex.html");
      },
      success: function (data) {},
    });
  });
}
if (window.location.href.indexOf("alogin") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/alogin",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      error: function (err, msg) {
        if (err.status == "405") window.location.replace("adindex.html");
      },
      success: function (data) {},
    });
  });
}
if (window.location.href.indexOf("lc123") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lc123",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      error: function (err, msg) {
        if (err.status == "404") window.location.replace("llogin.html");
      },
      success: function (data) {
        $.ajax({
          type: "GET",
          url: "http://localhost:3470/lc123",
          headers: {
            token: sessionStorage.getItem("token"),
            email: JSON.parse(sessionStorage.getItem("email")).email,
          },
          error: function (err, msg) {
            if (err.status == "404") window.location.replace("llogin.html");
          },
          success: function (data) {
            if (data.bought.length == 0) {
              alert("Buy any course to access compiler");
              window.location.href = "lcourses.html";
            } else {
              window.location.href = "compiler.html";
            }
          },
        });
      },
    });
  });
}
function taddtoBookmark(id) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/taddtoBookmark",

      headers: {
        id: id,
      },

      error: function (err, msg) {
        if (err.status == "404") window.location.href = "tlogin.html";
      },

      success: function (data) {},
    });
  });

  location.reload();
}

function tremoveBookmarks(id) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/tremovefromBookmark",

      headers: {
        id: id,
      },

      error: function (err, msg) {
        if (err.status == "404") window.location.href = "tlogin.html";
      },

      success: function (data) {},
    });
  });

  location.reload();
}
function approve(id) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/adapprove",

      headers: {
        name: id,
      },

      error: function (err, msg) {
        if (err.status == "404") window.location.href = "alogin.html";
      },

      success: function (data) {
        console.log();
      },
    });
  });
  location.reload();
}
function adaddtoBookmark(id) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/adaddtoBookmark",

      headers: {
        id: id,
      },

      error: function (err, msg) {
        if (err.status == "404") window.location.href = "alogin.html";
      },

      success: function (data) {},
    });
  });

  location.reload();
}

function adremoveBookmarks(id) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/adremovefromBookmark",

      headers: {
        id: id,
      },

      error: function (err, msg) {
        if (err.status == "404") window.location.href = "alogin.html";
      },

      success: function (data) {},
    });
  });

  location.reload();
}

function register() {
  if (window.location.href.indexOf("lregister") >= 0) {
    var decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var email =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if ($("#name").val().length > 0) {
      if ($("#email").val().match(email)) {
        if ($("#password").val().match(decimal)) {
          $.ajax({
            type: "POST",
            url: "http://localhost:3470/lregister",
            contentType: "application/json",
            data: JSON.stringify({
              name: $("#name").val(),
              email: $("#email").val(),
              password: $("#password").val(),
            }),
            error: function (err, message) {
              if (err.status == "404") {
                alert("User with email address exists. Please login.");
              }
            },
            success: function (data) {
              sessionStorage.setItem("token", data[0]);
              sessionStorage.setItem("email", JSON.stringify(data[1]));
              $.ajax({
                type: "POST",

                url: "http://localhost:3470/sendemailR",

                contentType: "application/json",

                data: JSON.stringify({
                  fullname: data.name,

                  email: data.email,
                }),
              });
              window.location.href = "llogin.html";
            },
          });
        } else {
          alert(
            "Password should of atleast 8 characters, combination of alphanumeric characters and atleast one special character"
          );
        }
      } else {
        alert("Please enter valid email address");
      }
    } else {
      alert("Please enter user name");
    }
  }
  if (window.location.href.indexOf("tregister") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/tregister",
      contentType: "application/json",
      data: JSON.stringify({
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      }),
      error: function (err, message) {
        alert(res.error.details);
      },
      success: function (data) {
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        $.ajax({
          type: "POST",

          url: "http://localhost:3470/sendemailR",

          contentType: "application/json",

          data: JSON.stringify({
            fullname: data.name,

            email: data.email,
          }),
        });
        window.location.href = "tlogin.html";
      },
    });
  }
}
function details(data1) {
  sessionStorage.setItem("id-crs", data1);
  setTimeout(() => {}, 50000);
}
function check(data) {
  if (window.location.href.indexOf("course-buy") >= 0) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lprogress",
      contentType: "application/json",
      headers: {
        email: sessionStorage.getItem("email"),
        moduleID: data,
      },
      success: function (data1) {
        location.reload();
      },
    });
  }
}
if (window.location.href.indexOf("course-buy") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/lprogress",

      contentType: "application/json",

      headers: {
        email: sessionStorage.getItem("email"),
      },

      success: function ([data1, data2]) {
        //logs

        // location.reload();
        // console.log(data1);

        var id = sessionStorage.getItem("id-crs");

        var prct = 0;

        for (i in data1) {
          if (data1[i].includes(id)) {
            prct++;

            document.getElementById(data1[i]).checked = true;
          }
        }

        for (i in data2) {
          if (Object.keys(data2[i])[0] == id) {
            prct++;
          }
        }

        // //logs

        $.ajax({
          type: "GET",

          url: "http://localhost:3470/getCourse",

          contentType: "application/json",

          headers: {
            corid: sessionStorage.getItem("id-crs"),
          },

          success: (data) => {
            // console.log(data);

            if (data.questions.length > 0) {
              var ttl =
                document.querySelectorAll('input[type="checkbox"]').length + 1;

              var completion = (prct / ttl) * 100;

              document.getElementById("prgs").innerHTML = `
 
     <h3>Progress:</h3><br>
 
     <div class="progress" style="margin-bottom : 30px;">
 
      <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style="width: ${completion}%" aria-valuenow="${completion}" aria-valuemin="0" aria-valuemax="100">${completion}%</div>
 
     </div>
 
     `;
            } else {
              var ttl = document.querySelectorAll(
                'input[type="checkbox"]'
              ).length;

              var completion = (prct / ttl) * 100;

              document.getElementById("prgs").innerHTML = `
 
    <h3>Progress:</h3><br>
 
    <div class="progress" style="margin-bottom : 30px;">
 
     <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style="width: ${completion}%" aria-valuenow="${completion}" aria-valuemin="0" aria-valuemax="100">${completion}%</div>
 
    </div>
 
    `;
            }
          },
        });
      },
    });
  });
}
function uploadt() {
  var arr = $(".mname");

  var tem_arr = [];

  for (let i = 0; i < arr.length; i++) {
    tem_arr.push(arr[i].value);
  }

  alert("Course Added");

  location.reload();
}

function upload() {
  var arr = $(".mname");

  var tem_arr = [];

  for (let i = 0; i < arr.length; i++) {
    tem_arr.push(arr[i].value);
  }

  alert("Course Added");

  location.reload();
}
function reupload() {
  var arr = $(".mname");
  var tem_arr = [];

  for (let i = 0; i < arr.length; i++) {
    tem_arr.push(arr[i].value);
  }
  var tem_arr1 = [];
  var arr = $(".mvideo");
  for (let i = 0; i < arr.length; i++) {
    tem_arr1.push(arr[i].value);
  }
  if (
    window.location.href.indexOf("add-listing") >= 0 ||
    window.location.href.indexOf("add-courses")
  ) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/readd-listing",
      contentType: "application/json",
      data: JSON.stringify({
        name: $("#cname").val(),
        description: $("#cdes").val(),
        prerequisites: $("#cpreq").val().split(","),
        price: $("#cprice").val(),
        uploaded: $("#teacher_name").val(),
        modules: tem_arr,
        videos: tem_arr1,
        students: [],
        type: $("#typ").val(),
      }),
      success: function (data) {},
    });
  }
  alert("Course updated");
  location.reload();
}

function resetData() {
  document.getElementById("change1").value = "";

  document.getElementById("change2").value = "";

  document.getElementById("change3").value = "";
}

function removeUser(email) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/deleteUI",

      headers: {
        email: email,
      },

      error: function (err, msg) {
        if (err.status == "404") window.location.href = "alogin.html";
      },

      success: function (data) {
        alert("deleted user");
      },
    });
  });

  location.reload();
}

function deleteCourse(name) {
  $.get("http://localhost:3470/faculty-det/", function (obj, status) {
    for (i in obj) {
      if (obj[i].name == name) {
        if (obj[i].students.length > 0) {
          alert("Users are registered in " + name + " can't delete");
          location.reload();
        } else {
          $(document).ready(function () {
            $.ajax({
              type: "GET",

              url: "http://localhost:3470/deleteCourse",

              headers: {
                name: name,
              },

              error: function (err, msg) {
                if (err.status == "404")
                  window.location.href = "./../learners/lindex.html";
              },

              success: function (data) {
                alert("Course deleted :" + name);
                location.reload();
              },
            });
          });
        }
      }
    }
  });
}

function changePasswordInstructor() {
  if (window.location.href.indexOf("teacher-profile") >= 0) {
    if ($("#change2").val() == "") {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Please enter valid password</p>";

      resetData();
    } else if ($("#change2").val() === $("#change3").val()) {
      $.ajax({
        type: "POST",

        url: "http://localhost:3470/teacher-profile",

        contentType: "application/json",

        data: JSON.stringify({
          email: JSON.parse(sessionStorage.getItem("email")).email,

          password: $("#change1").val(),

          newpassword: $("#change2").val(),

          retypepassword: $("#change3").val(),
        }),

        success: function () {
          resetData();

          document.getElementById("changing").innerHTML =
            "<p style='color:green'>Password successfully changed</p>";
        },

        error: function (err, message) {
          document.getElementById("changing").innerHTML =
            "<p style='color:red'>Your current password is incorrect</p>";
        },
      });
    } else {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Passwords do not match</p>";
    }
  }
}

function changePasswordAdmin() {
  if (window.location.href.indexOf("user-profile") >= 0) {
    if ($("#change2").val() == "") {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Please enter valid password</p>";

      resetData();
    } else if ($("#change2").val() === $("#change3").val()) {
      $.ajax({
        type: "POST",

        url: "http://localhost:3470/user-profile",

        contentType: "application/json",

        data: JSON.stringify({
          email: JSON.parse(sessionStorage.getItem("email")).email,

          password: $("#change1").val(),

          newpassword: $("#change2").val(),

          retypepassword: $("#change3").val(),
        }),

        success: function () {
          resetData();

          document.getElementById("changing").innerHTML =
            "<p style='color:green'>Password successfully changed</p>";
        },

        error: function (err, message) {
          document.getElementById("changing").innerHTML =
            "<p style='color:red'>Your current password is incorrect</p>";
        },
      });
    } else {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Passwords do not match</p>";
    }
  }
}

function changePassword() {
  if (window.location.href.indexOf("lprofile") >= 0) {
    if ($("#change2").val() == "") {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Please enter valid password</p>";

      resetData();
    } else if ($("#change2").val() === $("#change3").val()) {
      var decimal =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if ($("#change2").val().match(decimal)) {
        $.ajax({
          type: "POST",

          url: "http://localhost:3470/lprofile",

          contentType: "application/json",

          data: JSON.stringify({
            email: $("#change").val(),

            password: $("#change1").val(),

            newpassword: $("#change2").val(),

            retypepassword: $("#change3").val(),
          }),

          success: function (res, status) {
            resetData();
          },

          error: function (err, status) {
            if (err.status == "440") {
              alert("Your current password is incorrect");
            }
            if (err.status == "400") {
              alert("Password successfully changed");
            }
          },
        });
      } else {
        alert(
          "Password should of atleast 8 characters, combination of alphanumeric characters and atleast one special character"
        );
      }
    } else {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Passwords do not match</p>";
    }
  }
}
function login() {
  if (window.location.href.indexOf("llogin") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/llogin",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#usr").val(),
        password: $("#psw").val(),
      }),
      error: function (err, message) {
        if (err.status == "404") {
          alert("Please enter valid email.");
        }
        if (err.status == "405") {
          alert("Please enter valid password.");
        }
        if (err.status == "403") {
          alert("Email is not registered. Please Signup.");
        }
      },
      success: function (data) {
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        document.cookie = "logged = " + data[1].email;
        $.ajax({
          type: "POST",

          url: "http://localhost:3470/sendemailL",

          contentType: "application/json",

          data: JSON.stringify({
            fullname: data[1].name,

            email: data[1].email,
          }),
        });
        window.location.href = "lprofile.html";
      },
    });
  }
  if (window.location.href.indexOf("tlogin") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/tlogin",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#usr").val(),
        password: $("#psw").val(),
      }),
      error: function (err, message) {
        if (err.status == "404") {
          alert("Please enter valid email.");
        }
        if (err.status == "405") {
          alert("Please enter valid password.");
        }
        if (err.status == "403") {
          alert("Email is not registered.");
        }
      },
      success: function (data) {
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        document.cookie = "logged = " + data[1].email;
        $.ajax({
          type: "POST",

          url: "http://localhost:3470/sendemailI",

          contentType: "application/json",

          data: JSON.stringify({
            fullname: data[1].name,

            email: data[1].email,
          }),
        });
        window.location.href = "tindex.html";
      },
    });
  }
  if (window.location.href.indexOf("alogin") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/alogin",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#usr").val(),
        password: $("#psw").val(),
      }),
      error: function (err, message) {
        if (err.status == "404") {
          alert("Please enter valid email.");
        }
        if (err.status == "405") {
          alert("Please enter valid password.");
        }
        if (err.status == "403") {
          alert("Email is not registered.");
        }
        if (err.status == "406") {
          alert("The email is not registered. Please Register.");
        }
        if (err.status == "400") {
          alert("The password entered is wrong. Please re-enter");
        }
      },
      success: function (data) {
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        document.cookie = "logged = " + data[1].email;
        window.location.href = "adindex.html";
      },
    });
  }
}
if (window.location.href.indexOf("lprofile") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lprofile",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "lindex.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
      success: function (data) {
        $("#ndisp").html(data.name);
        $("#mdisp").html(data.email);
        $("#change").val(data.email);
      },
    });
  });
  $.ajax({
    type: "GET",
    url: "http://localhost:3470/course-stud/",
    contentType: "application/json",
    success: function (data) {
      obj = data[0];
      stud = data[1];
      var str = "";
      for (i in obj) {
        var str1 = "";
        var z = obj[i];
        for (b in obj[i].students) {
          if (
            obj[i].students[b]._id ==
            JSON.parse(sessionStorage.getItem("email"))._id
          ) {
            var total = z.modules.length;
            var prgs = 0;
            var id = z._id;
            for (p in stud) {
              for (k in stud[p].progress) {
                if (
                  stud[p]._id == JSON.parse(sessionStorage.getItem("email"))._id
                )
                  if (stud[p].progress[k].startsWith(id)) {
                    prgs++;
                  }
              }
            }
            if (prgs == total) {
              str += `
              <li class="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 publish">
              <div class="cours-bx">
                <div class="action-box">
                  <img src="../images/courses/pic1.jpg" alt="">
                  <a href="course-buy.html" class="btn" onclick= "details('${z._id}')">Read More</a>
                </div>
                <div class="info-bx text-center">
                  <h5><a href="#">${z["name"]}</a></h5>
                  <span>${z["type"]}</span>
                </div>
                  <div class="review" style = "display : grid; justify-content : center">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; ${z["ratings"].length} Ratings</span>
                    <ul class="cours-star" id='${z["name"]}'>
                      
                    </ul>
                  </div>
              </div>
            </li>
              `;
            } else {
              str += `
              <li class="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 pending">
              <div class="cours-bx">
                <div class="action-box">
                  <img src="../images/courses/pic1.jpg" alt="">
                  <a href="course-buy.html" class="btn" onclick= "details('${z._id}')">Read More</a>
                </div>
                <div class="info-bx text-center">
                  <h5><a href="#">${z["name"]}</a></h5>
                  <span>${z["type"]}</span>
                </div>
                  <div class="review" style = "display : grid; justify-content : center">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; ${z["ratings"].length} Ratings</span>
                    <ul class="cours-star"id='${z["name"]}' >
                      
                    </ul>
                  </div>
              </div>
            </li>
              `;
            }
          }
        }
        $("#masonry").html(str);
      }
      for (i in obj) {
        var str1 = "";
        var z = obj[i];
        for (b in obj[i].students) {
          if (
            obj[i].students[b]._id ==
            JSON.parse(sessionStorage.getItem("email"))._id
          ) {
            document.getElementById(z["name"]).innerHTML = `
         <li><i class="fa fa-star" id='${z["name"]}1'></i></li>
         <li><i class="fa fa-star" id='${z["name"]}2'></i></li>
         <li><i class="fa fa-star" id='${z["name"]}3'></i></li>
         <li><i class="fa fa-star" id='${z["name"]}4'></i></li>
         <li><i class="fa fa-star" id='${z["name"]}5'></i></li>
         `;

            if (z.averagerating) {
              for (let k = 1; k <= Math.round(z.averagerating); k++) {
                document.getElementById(`${z["name"] + k}`).style =
                  "color:green";
              }
            }
          }
        }
      }
    },
  });
  $.get("http://localhost:3470/admin-home-l", function (obj, status) {
    //logs

    for (i in obj) {
      //logs

      if (obj[i].email == JSON.parse(sessionStorage.getItem("email")).email) {
        //logs

        document.getElementById(
          "profile"
        ).innerHTML = `<img src=${obj[i].uploadpicture}></img>`;

        document.getElementById("aname").value =
          obj[i].name != undefined ? obj[i].name : "";

        document.getElementById("aemail").value =
          obj[i].email != undefined ? obj[i].email : "";

        document.getElementById("aoccu").value =
          obj[i].occupation != undefined ? obj[i].occupation : "";

        document.getElementById("acom").value =
          obj[i].companyName != undefined ? obj[i].companyName : "";

        document.getElementById("aphon").value =
          obj[i].PhoneNo != undefined ? obj[i].PhoneNo : "";

        document.getElementById("aadd").value =
          obj[i].address != undefined ? obj[i].address : "";

        document.getElementById("acity").value =
          obj[i].city != undefined ? obj[i].city : "";

        document.getElementById("astate").value =
          obj[i].state != undefined ? obj[i].state : "";

        document.getElementById("apost").value =
          obj[i].postcode != undefined ? obj[i].postcode : "";

        document.getElementById("alikd").value =
          obj[i].linkedin != undefined ? obj[i].linkedin : "";

        document.getElementById("afb").value =
          obj[i].facebook != undefined ? obj[i].facebook : "";

        document.getElementById("atwt").value =
          obj[i].twitter != undefined ? obj[i].twitter : "";

        document.getElementById("ainst").value =
          obj[i].instagram != undefined ? obj[i].instagram : "";
      }
    }
  });
}

if (window.location.href.indexOf("courses-details") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/courses-details",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        if (err.status == "404") window.location.href = "llogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
      success: function (data) {
        $.get("http://localhost:3470/faculty-det/", function (obj, status) {
          var str = "";
          for (i in obj) {
            if (obj[i]._id == sessionStorage.getItem("id-crs")) {
              str += `
       
               <div class="row d-flex flex-row-reverse">
       
               <div class="col-lg-3 col-md-4 col-sm-12 m-b30">
       
                <div class="course-detail-bx">
       
                 <div class="course-price">
       
                  <del>₹2000</del>
       
                  <h4 class="price">₹${obj[i].price}</h4>
       
                 </div>
       
                 <div class="course-buy-now text-center">
       
      
                  <button id="rzp-button1" onclick="testPay('${obj[i]._id}','${
                obj[i].name
              }','${
                obj[i].price
              }')" class="btn text-uppercase radius-xl m-3 p-3">Buy Now</button>
       
                 </div>
       
                 <div class="teacher-bx">
       
                  <div class="teacher-info">
       
                   <div class="teacher-thumb">
       
                    <img src="../images/testimonials/pic1.jpg" alt="" />
       
                   </div>
       
                   <div class="teacher-name">
       
                    <h5>${obj[i].uploaded}</h5>
       
                    <span>Teacher</span>
       
                   </div>
       
                  </div>
       
                 </div>
       
                 <div class="cours-more-info">
       
                  <div class="review">
       
                   <span>${obj[i].ratings.length} Review</span>
       
                   <ul class="cours-star" id="${obj[i].name}">
       
                    
       
                   </ul>
       
                  </div>
       
                  <div class="price categories">
       
                   <span>Categories</span>
       
                   <h5 class="text-primary">${obj[i].type}</h5>
       
                  </div>
       
                 </div>
       
                 <div class="course-info-list scroll-page">
       
                  <ul class="navbar">
       
                   <li>
       
                    <a class="nav-link" href="#overview"
       
                     ><i class="ti-zip"></i>Overview</a
       
                    >
       
                   </li>
       
                   <li>
       
                   <a class="nav-link" href="#instructor"
      
                    ><i class="ti-user"></i>Instructor</a
      
                   >
      
                  </li>
      
                   <li>
       
                    <a class="nav-link" href="#curriculum"
       
                     ><i class="ti-bookmark-alt"></i>Curriculum</a
       
                    >
       
                   </li>
       
                  
       
                   <li>
       
                    <a class="nav-link" href="#reviews"
       
                     ><i class="ti-comments"></i>Reviews</a
       
                    >
       
                   </li>
       
                  </ul>
       
                 </div>
       
                </div>
       
               </div>
       
               
       
               <div class="col-lg-9 col-md-8 col-sm-12">
       
                <div class="courses-post">
       
                 <div class="ttr-post-media media-effect">
       
                  <a href="#"><img src="../images/blog/default/thum3.jpg" alt="" /></a>
       
                 </div>
       
                 <div class="ttr-post-info">
       
                  <div class="ttr-post-title">
       
                   <h2 class="post-title">${obj[i].name}</h2>
       
                  </div>
       
                 </div>
       
                </div>
       
                <div class="courese-overview" id="overview">
       
                 <h4>Overview</h4>
       
                 <div class="row">
       
                  <div class="col-md-12 col-lg-4">
       
                   <ul class="course-features">
       
                    <li>
       
                     <i class="ti-book"></i> <span class="label">Lectures :</span>
       
                     <span class="value">${obj[i].videos.length}</span>
       
                    </li>
       
                    <li>
       
                     <i class="ti-help-alt"></i> <span class="label">Quizzes :</span>
       
                     <span class="value">${obj[i].quiz.length}</span>
       
                    </li>
       
                    <li>
       
                     <i class="ti-time"></i> <span class="label">Duration :</span>
       
                     <span class="value" id="totalDur"></span>
       
                    </li>
       
                    <li>
       
                     <i class="ti-smallcap"></i> <span class="label">Language :</span>
       
                     <span class="value">English</span>
       
                    </li>
       
                    <li>
       
                     <i class="ti-user"></i> <span class="label">Students :</span>
       
                     <span class="value">${obj[i].students.length}</span>
       
                    </li>
       
                    <li>
       
                     <i class="ti-check-box"></i>
       
                     <span class="label">Assessments:</span>
       
                     <span class="value">${obj[i].questions.length > 0}</span>
       
                    </li>
       
                   </ul>
       
                  </div>
       
                  <div class="col-md-12 col-lg-8">
       
                  
       
                   <h5 class="m-b5">Course Description</h5>
       
                   <p>
       
                    ${obj[i].description}
       
                   </p>
       
                   <h5 class="m-b5">Pre-Requisetes</h5>
       
                   <ul class="list-checked primary">
       
                    <li>${obj[i].prerequisites}</li>
       
                   </ul> 
       
                   <div class="" id="instructor">
       
                 <h4>Instructor</h4>
       
                 <div class="instructor-bx">
       
                  <div class="instructor-author" id="insdp">
       
                   <img src="../images/testimonials/pic1.jpg" alt="" />
       
                  </div>
       
                  <div class="instructor-info">
       
                   <h6>${obj[i].uploaded}</h6>
       
                   <span>Professor</span>
       
                   <ul class="list-inline m-tb10">
       
                    <li>
       
                     <a href="https://www.facebook.com" class="btn-link"
       
                      ><i class="fa fa-facebook"></i
       
                     ></a>
       
                    </li>
       
                    <li>
       
                     <a href="https://www.twitter.com" class="btn-link"
       
                      ><i class="fa fa-twitter"></i
       
                     ></a>
       
                    </li>
       
                    <li>
       
                     <a href="https://linkedin.com" class="btn-link"
       
                      ><i class="fa fa-linkedin"></i
       
                     ></a>
       
                    </li>
       
                    <li>
       
                     <a
       
                      href="https://accounts.google.com/v3/signin/identifier?dsh=S721896348%3A1678397977974496&ifkv=AWnogHcj-OCh8ZPxIv1B4Qf22q8fFpKHEHsnl-wCdCGqxcmMiQyHDoYEcshnE0RP_75jpEhWk7rd9Q&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
       
                      class="btn-link"
       
                      ><i class="fa fa-google-plus"></i
       
                     ></a>
       
                    </li>
       
                   </ul>
       
                  </div>
       
                 </div>
       
                  </div>
       
                   
       
                 </div>
       
                  
       
                </div>
       
                 
                <div class="" id="reviews">
       
                 <h4>Reviews</h4>
       
                  <div id="review">
                  </div>
       
                 <div class="review-bx">
       
                  <div class="all-review">
       
                   <h2 class="rating-type">${obj[i].averagerating}</h2>
                  
       
                   <span>${obj[i].ratings.length} Ratings</span>
       
                  </div>
       
                  <div class="review-bar">
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>5 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 5
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 5
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>4 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 4
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 4
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>3 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 3
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 3
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>2 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 2
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 2
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>1 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 1
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 1
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                  </div>
       
                 </div>
       
                </div>
       
               </div>
       
              </div>
       
               
       
               `;
            }
            document.getElementById("crs-det").innerHTML = str;
          }
          var totaldur = 0;
          for (i in obj) {
            if (obj[i]._id == sessionStorage.getItem("id-crs")) {
              for (let j = 0; j < obj[i].modules.length; j++) {
                document.getElementById("curriculum").innerHTML += `
                      <li>
                        <div class="curriculum-list-box">
                          <span>Module ${j + 1}.</span> <b>${
                  obj[i].modules[j]
                }</b>
                        </div>
                        <span>${obj[i].times[j]} minutes</span>
                      </li>
              `;
                totaldur += obj[i].times[j];
              }
            }
          }
          document.getElementById("totalDur").innerText = totaldur + " minutes";
          var dp;
          for (i in obj) {
            if (sessionStorage.getItem("id-crs") == obj[i]._id) {
              localStorage.setItem("dp", obj[i].uploaded);
              document.getElementById(obj[i].name).innerHTML = `
                        <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
                        <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
                        <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
                        <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
                        <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
                        `;
              for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
                document.getElementById(obj[i].name + j).style = "color:green";
              }
            }
          }
          for (i in obj) {
            if (sessionStorage.getItem("id-crs") == obj[i]._id)
              for (j in obj[i].reviews) {
                document.getElementById(
                  "review"
                ).innerHTML += `<p>☑ ${obj[i].reviews[j].review}</p>`;
              }
          }
          setTimeout(() => {
            $.get("http://localhost:3470/admin-home-i", function (obj, status) {
              for (i in obj)
                if ((obj[i].email = localStorage.getItem("dp"))) {
                  document.getElementById(
                    "insdp"
                  ).innerHTML = `<img src = ${obj[i].uploadpicture} alt="instructor"/>`;
                }
            });
          }, 1000);
        });
      },
    });
  });
}

var count = 0;

var ratings = 0;

function function1(id) {
  ratings = id;

  if (count == 0) {
    if (id < 3) {
      for (let i = 1; i <= id; i++) {
        document.getElementById(i).style = "color:red";
      }
    } else {
      for (let i = 1; i <= id; i++) {
        document.getElementById(i).style = "color:green";
      }
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      document.getElementById(i).style = "none";

      count = 0;
    }

    if (id < 3) {
      for (let i = 1; i <= id; i++) {
        document.getElementById(i).style = "color:red";
      }
    } else {
      for (let i = 1; i <= id; i++) {
        document.getElementById(i).style = "color:green";
      }
    }
  }

  count = count + 1;
}

function submit_ratings(name) {
  if (ratings == 0) {
    alert("Please give the valid rating");
  } else {
    $(document).ready(function () {
      $.ajax({
        type: "GET",

        url: "http://localhost:3470/addRatings",

        headers: {
          _id: JSON.parse(sessionStorage.getItem("email")).email,

          name: name,

          ratings: ratings,
        },

        error: function (err, msg) {
          if (err.status == "404") window.location.href = "alogin.html";
        },

        success: function (data) {},
      });
    });
  }
  alert("ratings submitted!");
  location.reload();
}

if (window.location.href.indexOf("course-buy") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/course-buy",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
  $.get("http://localhost:3470/faculty-det/", function (obj, status) {
    var str = "";
    for (i in obj) {
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
        localStorage.setItem("dp", obj[i].uploaded);
        str += `
                <div class="row d-flex flex-row-reverse">
                <div class="col-lg-3 col-md-4 col-sm-12 m-b30">
                  <div class="course-detail-bx">
                    <div class="course-buy-now text-center">
                      <a href="#" style = "padding  : 15px" class="btn-success radius-xl text-uppercase" >Subscribed</a>
                    </div>
                    <div class="teacher-bx">
                      <div class="teacher-info">
                        <div class="teacher-thumb">
                          <img src="../images/testimonials/pic2.jpg" alt="" />
                        </div>
                        <div class="teacher-name">
                          <h5>${obj[i].uploaded}</h5>
                          <span>Teacher</span>
                        </div>
                      </div>
                    </div>
                    <div class="cours-more-info">
                      <div class="review">
                      
                        <div>
                        <span>${obj[i].ratings.length} ratings</span> <br>
                        <span>Rating : ${obj[i].averagerating}</span>
                        <ul class="cours-star" id='${obj[i].name}'>
             
                         </ul>
                        </div>
                        <span>${obj[i].reviews.length} Review</span>
                        
                       
                      </div>
                      
                      <div class="price categories">
                        <span>Categories</span>
                        <h5 class="text-primary">${obj[i].type}</h5>
                        
                        <ul class="cours-star">

                        <li><i class="fa fa-star" id="1" onclick="function1(id)"></i></li>
           
                        <li><i class="fa fa-star" id="2" onclick="function1(id)"></i></li>
           
                        <li><i class="fa fa-star" id="3" onclick="function1(id)"></i></li>
           
                        <li><i class="fa fa-star" id="4" onclick="function1(id)"></i></li>
           
                        <li><i class="fa fa-star" id="5" onclick="function1(id)"></i></li>
           
                       </ul>
                       <a onclick="submit_ratings('${
                         obj[i].name
                       }')">SUBMIT</a><br>
                      </div>
                    </div>
                    <div class="course-info-list scroll-page">
                      <ul class="navbar">
                        <li>
                          <a class="nav-link" href="#overview"
                            ><i class="ti-zip"></i>Overview</a
                          >
                        </li>
                        <li>
                        <a class="nav-link" href="#instructor"
                          ><i class="ti-user"></i>Instructor</a
                        >
                      </li>
                        <li>
                          <a class="nav-link" href="#curriculum"
                            ><i class="ti-bookmark-alt"></i>Curriculum</a
                          >
                        </li>
                       
                        <li>
                          <a class="nav-link" href="#reviews"
                            ><i class="ti-comments"></i>Reviews</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              
                <div class="col-lg-9 col-md-8 col-sm-12">
                  <div class="courses-post">
                    <div class="ttr-post-media media-effect">
                      <a href="#"><img src="../images/blog/default/thum3.jpg" alt="" /></a>
                    </div>
                    <div class="ttr-post-info">
                      <div class="ttr-post-title">
                        <h2 class="post-title">${obj[i].name}</h2>
                      </div>
                    </div>
                  </div>
                  <div class="courese-overview" id="overview">
                    <h4>Overview</h4>
                    <div class="row">
                      <div class="col-md-12 col-lg-4">
                        <ul class="course-features">
                          <li>
                            <i class="ti-book"></i> <span class="label">Lectures :</span>
                            <span class="value">${obj[i].videos.length}</span>
                          </li>
                          <li>
                            <i class="ti-help-alt"></i> <span class="label">Quizzes :</span>
                            <span class="value">${obj[i].quiz.length}</span>
                          </li>
                          <li>
                            <i class="ti-time"></i> <span class="label">Duration :</span>
                            <span class="value" id="totalDur"></span>
                          </li>
                          <li>
                            <i class="ti-smallcap"></i> <span class="label">Language :</span>
                            <span class="value">English</span>
                          </li>
                          <li>
                            <i class="ti-user"></i> <span class="label">Students :</span>
                            <span class="value">${obj[i].students.length}</span>
                          </li>
                          <li>
                            <i class="ti-check-box"></i>
                            <span class="label">Assessments:</span>
                            <span class="value">--update--</span>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-12 col-lg-8">
                        <h5 class="m-b5">Course Description</h5>
                        <p>
                          ${obj[i].description}
                        </p>
                        <h5 class="m-b5">Pre-Requisetes</h5>
                        <ul class="list-checked primary">
                          <li>${obj[i].prerequisites}</li>
                        </ul> 
                        <div class="" id="instructor">
                    <h4>Instructor</h4>
                    <div class="instructor-bx">
                      <div class="instructor-author" id="insdp">
                        <img src="../images/testimonials/pic1.jpg" alt="" />
                      </div>
                      <div class="instructor-info">
                        <h6>${obj[i].uploaded}</h6>
                        <span>Professor</span>
                        <ul class="list-inline m-tb10">
                          <li>
                            <a href="https://www.facebook.com" class="btn-link"
                              ><i class="fa fa-facebook"></i
                            ></a>
                          </li>
                          <li>
                            <a href="https://www.twitter.com" class="btn-link"
                              ><i class="fa fa-twitter"></i
                            ></a>
                          </li>
                          <li>
                            <a href="https://linkedin.com" class="btn-link"
                              ><i class="fa fa-linkedin"></i
                            ></a>
                          </li>
                          <li>
                            <a
                              href="https://accounts.google.com/v3/signin/identifier?dsh=S721896348%3A1678397977974496&ifkv=AWnogHcj-OCh8ZPxIv1B4Qf22q8fFpKHEHsnl-wCdCGqxcmMiQyHDoYEcshnE0RP_75jpEhWk7rd9Q&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                              class="btn-link"
                              ><i class="fa fa-google-plus"></i
                            ></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                      </div>
                      
                    </div>
                    
                    
                  </div>
                  <div class="" id="reviews">
       
                 <h4>Reviews</h4>
       
                  <div id="review">
                  </div>
       
                 <div class="review-bx">
       
                  <div class="all-review">
       
                   <h2 class="rating-type">${obj[i].averagerating}</h2>
                  
       
                   <span>${obj[i].ratings.length} Ratings</span>
       
                  </div>
       
                  <div class="review-bar">
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>5 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 5
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 5
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>4 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 4
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 4
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>3 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 3
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 3
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>2 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 2
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 2
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                   <div class="bar-bx">
       
                    <div class="side">
       
                     <div>1 star</div>
       
                    </div>
       
                    <div class="middle">
       
                     <div class="bar-container">
       
                      <div class="bar-5" style="width: ${
                        (obj[i].ratings.filter(
                          (currentItem) => currentItem.ratings == 1
                        ).length *
                          100) /
                        obj[i].ratings.length
                      }%"></div>
       
                     </div>
       
                    </div>
       
                    <div class="side right">
       
                     <div>${
                       obj[i].ratings.filter(
                         (currentItem) => currentItem.ratings == 1
                       ).length
                     }</div>
       
                    </div>
       
                   </div>
       
                  </div>
       
                 </div>
       
                </div>
                </div>
              </div>
              
                `;
      }
    }
    var totaldur = 0;
    document.getElementById("crs-det").innerHTML = str;
    for (i in obj) {
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
        for (let j = 0; j < obj[i].modules.length; j++) {
          document.getElementById("curriculum").innerHTML += `
                  <ul>
                    <div class="curriculum-list-box card" style="border-radius : 30px; padding : 10px; background-color : #d5d5d5">
                      <li>
                       <span> <a target = "_blank" href=${
                         obj[i].videos[j]
                       }  style="font-size:24px;" onclick=check('${
            obj[i]._id
          }+${j + 1}video')>${
            j + 1
          }.&nbsp; <b style= "text-transform: uppercase;font-size:24px;">${
            obj[i].modules[j]
          }  </b><i class="fa fa-play-circle" style="font-size:24px;"></i></a></span>
                       <div style="display:grid; justify-content : center;" ><span id="toggletime" style="font-size : 15px">${
                         obj[i].times[j]
                       } minutes</span></div>
                        <div class="round float-right">
                          <input type="checkbox" id="${obj[i]._id}+${
            j + 1
          }video" style="display: flex; justify-content : right;"/>
                          <label for="checkbox"></label>
                        </div>
                      </li>
                      <div onclick=check('${obj[i]._id}+${
            j + 1
          }video') style = "display : flex; justify-content : center" id="toggler-vid" >
                      
          </div>
                    </div>
                  </ul>
                  <br>
          `;
          totaldur += obj[i].times[j];
        }
      }
    }
    document.getElementById("totalDur").innerText = totaldur + " minutes";
    for (i in obj) {
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
        if (obj[i].scores.length > 0) {
          for (j in obj[i].scores) {
            // console.log(obj[i].scores[j]);
            if (
              Object.keys(obj[i].scores[j]).indexOf(
                JSON.parse(sessionStorage.getItem("email"))._id
              ) >= 0
            ) {
              document.getElementById(
                "assesmentest"
              ).innerHTML = `<h2>Assesment ${obj[i].name} Score : ${
                (obj[i].scores[j][
                  JSON.parse(sessionStorage.getItem("email"))._id
                ] *
                  100) /
                obj[i].questions.length
              }%</h2>`;
            } else {
              document.getElementById(
                "assesmentest"
              ).innerHTML += `<h2>Assesment</h2>
       
                    <a href="assesment.html"><h4 class="fa fa-angle-double-right">Go to Assesment Page</h4></a>
       
                    <p >Number of Questions : ${obj[i].questions.length}</p>
       
                    `;
            }
          }
        } else if (obj[i].questions.length > 0) {
          localStorage.setItem("testlink", obj[i]._id);

          document.getElementById(
            "assesmentest"
          ).innerHTML += `<h2>Assesment</h2>
   
                <a href="assesment.html"><h4 class="fa fa-angle-double-right">Go to Assesment Page</h4></a>
   
                <p >Number of Questions : ${obj[i].questions.length}</p>
   
                `;
        }
      }
    }

    for (i in obj) {
      if (sessionStorage.getItem("id-crs") == obj[i]._id)
        for (j in obj[i].reviews) {
          document.getElementById(
            "review"
          ).innerHTML += `<p>☑ ${obj[i].reviews[j].review}</p>`;
        }
    }
    var revstr = "";

    for (i in obj) {
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
        revstr = `<h4>Reviews</h4>

    <textarea class="form-control card" name="review" id="reviews123" cols="80" rows="5%" style="max-width:100%;"></textarea>

    <br>

    <button class="btn" onclick="submit_review('${obj[i].name}')">Submit</button>`;
      }
    }
    document.getElementById("submitreviews").innerHTML = revstr;
    for (i in obj) {
      if (sessionStorage.getItem("id-crs") == obj[i]._id) {
        dp = obj[i].uploaded;
        document.getElementById(obj[i].name).innerHTML = `
                  <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
                  `;
        for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
          document.getElementById(obj[i].name + j).style = "color:green";
        }
      }
    }
  });
  setTimeout(() => {
    $.get("http://localhost:3470/admin-home-i", function (obj, status) {
      for (i in obj)
        if ((obj[i].email = localStorage.getItem("dp"))) {
          document.getElementById(
            "insdp"
          ).innerHTML = `<img src = ${obj[i].uploadpicture} alt="instructor"/>`;
        }
    });
  }, 1000);
}
if (window.location.href.indexOf("forget-password") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/forget-password",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("tchat1") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/tchat1",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("lcourses") >= 0) {
  function myfun1() {
    var srch = document.getElementById("srch").value;
    var typs = document.getElementsByName("cat");
    for (let i = 0; i < typs.length; i++) {
      if (
        typs[i].innerText.toLocaleLowerCase().includes(srch.toLocaleLowerCase())
      ) {
        typs[i].parentNode.parentNode.parentNode.style.display = "block";
      } else {
        typs[i].parentNode.parentNode.parentNode.style.display = "none";
      }
    }
  }
  function myfun2(data) {
    var srch = data;
    var typs = document.getElementsByName("cat");
    for (let i = 0; i < typs.length; i++) {
      if (
        typs[i].innerText.toLocaleLowerCase().includes(srch.toLocaleLowerCase())
      ) {
        typs[i].parentNode.parentNode.parentNode.style.display = "block";
      } else {
        typs[i].parentNode.parentNode.parentNode.style.display = "none";
      }
    }
  }
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lcourses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
      success: $.get(
        "http://localhost:3470/course-stud/",
        function (data, status) {
          var str = "";
          obj = data[0];
          stud = data[1];
          var bgt = [];
          for (i in stud) {
            if (sessionStorage.getItem("token") != null)
              if (
                stud[i]._id == JSON.parse(sessionStorage.getItem("email"))._id
              ) {
                for (j in stud[i].bought) {
                  bgt.push(stud[i].bought[j].corid);
                }
              }
          }
          if (bgt.length == 0) {
            for (i in obj) {
              if (obj[i].status) {
                str += `
                      <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                        <div class="cours-bx" >
                        <div class="action-box">
                          <img src="../images/courses/pic1.jpg" alt="">
                          <a href="courses-details.html" onclick= "details('${obj[i]._id}')" class="btn">Read More</a>
                        </div>
                        <div class="info-bx text-center">              
                          <h5><a href="courses-details.html">${obj[i].name}</a></h5>              
                          <span name="cat">${obj[i].type}</span>            
                        </div>              
                        <div class="cours-more-info">            
                          <div class="review">              
                            <span>Rating: ${obj[i].averagerating}</span>              
                            <ul class="cours-star" id='${obj[i].name}'>                                                        
                            </ul>              
                          </div>              
                          <div class="price">              
                            <del>$2000</del>              
                            <h5>$${obj[i].price}</h5>              
                          </div>              
                        </div>             
                        </div>
                      </div>
                        `;
              }
            }
          } else {
            for (i in obj) {
              if (obj[i].status && !bgt.includes(obj[i]._id)) {
                str += `
                      <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
                        <div class="cours-bx" >
                        <div class="action-box">
                          <img src="../images/courses/pic1.jpg" alt="">
                          <a href="courses-details.html" onclick= "details('${obj[i]._id}')" class="btn">Read More</a>
                        </div>
                        <div class="info-bx text-center">              
                          <h5><a href="courses-details.html">${obj[i].name}</a></h5>              
                          <span name="cat">${obj[i].type}</span>            
                        </div>              
                        <div class="cours-more-info">            
                          <div class="review">              
                            <span>Rating: ${obj[i].averagerating}</span>              
                            <ul class="cours-star" id='${obj[i].name}'>                                                        
                            </ul>              
                          </div>              
                          <div class="price">              
                            <del>$2000</del>              
                            <h5>$${obj[i].price}</h5>              
                          </div>              
                        </div>             
                        </div>
                      </div>
                        `;
              }
            }
          }

          document.getElementById("cors").innerHTML = str;
          $.get("http://localhost:3470/faculty-det", function (obj, status) {
            for (i in obj) {
              if (!bgt.includes(obj[i]._id) && obj[i].status) {
                document.getElementById(obj[i].name).innerHTML = `
                  <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
                  <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
                  `;
                for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
                  document.getElementById(obj[i].name + j).style =
                    "color:green";
                }
              }
            }
          });
        }
      ),
    });
  });
  sessionStorage.removeItem("id-crs");
}
if (window.location.href.indexOf("teacher-profile") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/teacher-profile",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("add-listing") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/add-listing",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("edit-listing") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/edit-listing",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("tcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/tcourses",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    $.get("http://localhost:3470/faculty-det/", function (obj, status) {
      var k = JSON.parse(sessionStorage.getItem("email"));

      var str = "";
      for (let i = obj.length - 1; i >= 0; i--) {
        if (obj[i].uploaded == k.email && obj[i].status) {
          str += `<div class="card-courses-list admin-courses">
 
    <div class="card-courses-media">
 
     <img  src="../images/courses/pic1.jpg" alt="profile" />
 
    </div>
 
    <div class="card-courses-full-dec">
 
     <div class="card-courses-title">
 
      <h4>${obj[i].name}</h4>
 
     </div>
 
     <div class="card-courses-list-bx">
 
      <ul class="card-courses-view">
 
       <li class="card-courses-user">
 
        <div class="card-courses-user-pic">
 
         <img name='${obj[i].uploaded}' src="../images/testimonials/pic3.jpg" alt="" />
 
        </div>
 
        <div class="card-courses-user-info">
 
         <h5>Teacher</h5>
 
         <h4>${obj[i].uploaded}</h4>
 
        </div>
 
       </li>
 
       <li class="card-courses-categories">
 
        <h5>Category</h5>
 
        <h4>${obj[i].type}</h4>
 
       </li>
 
       <li class="card-courses-review">
 
        <h5>${obj[i].ratings.length} Ratings</h5>
 
        <ul class="cours-star" id='${obj[i].name}crs'>
 
        
 
        </ul>
 
       </li>
 
       <li class="card-courses-price">
 
        <del>₹2000</del>
 
        <h5 class="text-primary">₹ ${obj[i].price}</h5>
 
       </li>
 
      </ul>
 
     </div>
 
     <div class="row card-courses-dec">
 
      <div class="col-md-12">
 
       <h6 class="m-b10">Course Description</h6>
 
       <p>${obj[i].description}
 
       </p>
 
      </div>
 
      <div class="col-md-6">
 
      <a href="#" class="btn violetblue outline radius-xl" onclick = "taddtoBookmark('${obj[i]._id}')">Add to Bookmarks</a>
 
 
 
       <a href="#" class="btn red outline radius-xl" onclick = "deleteCourse('${obj[i].name}')">Delete</a>
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
        }

        document.getElementById("teachercourse").innerHTML = str;
      }
      setTimeout(function () {
        for (i in obj) {
          dp = obj[i].uploaded;
          document.getElementById(obj[i].name + "crs").innerHTML = `
                    <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
                    `;
          for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
            document.getElementById(obj[i].name + j).style = "color:green";
          }
        }
      }, 100);
      $.get("http://localhost:3470/admin-home-i", function (obj, status) {
        for (i in obj)
          if (
            JSON.parse(sessionStorage.getItem("email")).email == obj[i].email
          ) {
            for (j in document.getElementsByName(obj[i].email)) {
              document.getElementsByName(obj[i].email)[j].src =
                obj[i].uploadpicture;
            }
          }
      });
    });
  });
}
if (window.location.href.indexOf("treview") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/treview",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}

if (window.location.href.indexOf("tbookmark") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/tbookmark",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    $.get("http://localhost:3470/faculty-det/", function (obj, status) {
      var str = "";
      k = JSON.parse(sessionStorage.getItem("email"));
      for (i in obj) {
        if (obj[i].tbookmark && obj[i].uploaded == k.email) {
          str += `<div class="card-courses-list admin-courses">
 
    <div class="card-courses-media">
 
     <img src="../images/courses/pic1.jpg" alt="" />
 
    </div>
 
    <div class="card-courses-full-dec">
 
     <div class="card-courses-title">
 
      <h4>${obj[i].name}</h4>
 
     </div>
 
     <div class="card-courses-list-bx">
 
      <ul class="card-courses-view">
 
       <li class="card-courses-user">
 
        <div class="card-courses-user-pic">
 
         <img id='${obj[i].uploaded}' src="../images/testimonials/pic3.jpg" alt="" />
 
        </div>
 
        <div class="card-courses-user-info">
 
         <h5>Teacher</h5>
 
         <h4>${obj[i].uploaded}</h4>
 
        </div>
 
       </li>
 
       <li class="card-courses-categories">
 
        <h5>Category</h5>
 
        <h4>${obj[i].type}</h4>
 
       </li>
 
       <li class="card-courses-review">
 
        <h5>3 Review</h5>
 
        <ul class="cours-star" id='${obj[i].name}bkm'>
 
        
 
        </ul>
 
       </li>
 
       <li class="card-courses-price">
 
        <del>₹2000</del>
 
        <h5 class="text-primary">₹ ${obj[i].price}</h5>
 
       </li>
 
      </ul>
 
     </div>
 
     <div class="row card-courses-dec">
 
      <div class="col-md-12">
 
       <h6 class="m-b10">Course Description</h6>
 
       <p>${obj[i].description}
 
       </p>
 
      </div>
 
      <div class="col-md-6">
 
       <a href="#" class="btn red outline radius-xl" onclick = "tremoveBookmarks('${obj[i]._id}')">Remove from Bookmarks</a>
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
        }

        document.getElementById("taddtoBookmarks").innerHTML = str;
      }

      document.getElementById("taddtoBookmarks").innerHTML = str;
      setTimeout(function () {
        for (i in obj) {
          dp = obj[i].uploaded;
          if (obj[i].tbookmark) {
            document.getElementById(obj[i].name + "bkm").innerHTML = `
                    <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
                    <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
                    `;
            for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
              document.getElementById(obj[i].name + j).style = "color:green";
            }
          }
        }
      }, 100);
      $.get("http://localhost:3470/admin-home-i", function (obj, status) {
        for (i in obj) {
          if (
            obj[i].email == JSON.parse(sessionStorage.getItem("email")).email
          ) {
            document.getElementById(obj[i].email).src = obj[i].uploadpicture;
          }
        }
      });
    });
  });
}
if (window.location.href.indexOf("added") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/added",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("tindex") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/tindex",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("adindex") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/adindex",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    var str = "";
    $.get("http://localhost:3470/admin-home-l/", function (obj, status) {
      for (i in obj) {
        str += `<li>

      <span class="new-users-pic" >
   
        <img class="mar" src="${obj[i].uploadpicture}" alt="" / width=30px height=30px> 
   
      </span>
   
      <span class="new-users-text">
   
        <a href="#" class="new-users-name">${obj[i].name} </a>
   
        <span class="new-users-info" id="lemail">${obj[i].email}</span>
   
      </span>
   
      <span class="new-users-btn" id="remove" onclick="removeUser('${obj[i].email}')">
   
      <a href="#" class="btn btn-danger button-sm outline">Remove</a>
   
     </span>
   
      </li>`;
      }
      $("#ler").text(obj.length);
      $("#front2").html(str);
    });

    var str1 = "";
    $.get("http://localhost:3470/admin-home-i/", function (obj, status) {
      for (i in obj) {
        str1 += `<li>

      <span class="new-users-pic" >

        <img class="mar" src="${obj[i].uploadpicture}" alt="" / width=30px height=30px> 

      </span>

      <span class="new-users-text">

        <a href="#" class="new-users-name">${obj[i].name} </a>

        <span class="new-users-info" id="temail">${obj[i].email}</span>

      </span>

      <span class="new-users-btn" id="remove" onclick="removeUser('${obj[i].email}')">

      <a href="#" class="btn btn-danger button-sm outline">Remove</a>

     </span>

      </li>`;
      }
      $("#ins").text(obj.length);
      $("#front1").html(str1);
    });
  });
}

if (window.location.href.indexOf("abookmark") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/abookmark",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    $.get("http://localhost:3470/faculty-det/", function (obj, status) {
      temp = [];
      for (i in obj) {
        if (obj[i].adbookmark && obj[i].status) temp.push(obj[i].uploaded);
      }
      $.ajax({
        type: "GET",
        url: "http://localhost:3470/getTeacherImage",
        headers: {
          email: [temp],
        },
        success: function (data) {
          var str = "";
          var pz = 0;
          for (let i = obj.length - 1; i >= 0; i--) {
            if (obj[i].adbookmark && obj[i].status) {
              str += `<div class="card-courses-list admin-courses">
 
    <div class="card-courses-media">
 
     <img src="../images/courses/pic1.jpg" alt="" />
 
    </div>
 
    <div class="card-courses-full-dec">
 
     <div class="card-courses-title">
 
      <h4>${obj[i].name}</h4>
 
     </div>
 
     <div class="card-courses-list-bx">
 
      <ul class="card-courses-view">
 
       <li class="card-courses-user">
 
        <div class="card-courses-user-pic">
 
         <img id="" src='${data[pz++][obj[i].uploaded]}' alt="" />
 
        </div>
 
        <div class="card-courses-user-info">
 
         <h5>Teacher</h5>
 
         <h4>${obj[i].uploaded}</h4>
 
        </div>
 
       </li>
 
       <li class="card-courses-categories">
 
        <h5>Category</h5>
 
        <h4>${obj[i].type}</h4>
 
       </li>
 
       <li class="card-courses-review">
 
        <h5>${obj[i].ratings.length} Ratings</h5>
 
        <ul class="cours-star" id="${obj[i].name}">
 
         
 
        </ul>
 
       </li>
 
       <li class="card-courses-price">
 
        <del>₹2000</del>
 
        <h5 class="text-primary">₹ ${obj[i].price}</h5>
 
       </li>
 
      </ul>
 
     </div>
 
     <div class="row card-courses-dec">
 
      <div class="col-md-12">
 
       <h6 class="m-b10">Course Description</h6>
 
       <p>${obj[i].description}
 
       </p>
 
      </div>`;

              if (obj[i].status) {
                str += `
      <div class="col-md-6">
 
 
      <a href = "#"class="btn violetblue outline radius-xl" onclick = "adaddtoBookmark('${obj[i]._id}')">Add to BookMarks</a>
 
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
              } else {
                str += `
      <div class="col-md-6">
 
 
      <a href="#" class="btn violetblue outline radius-xl" onclick = "approve('${obj[i].name}')">Appove</a>
 
       <a href="#" class="btn red outline radius-xl" onclick = "deleteCourse('${obj[i].name}')">Deny</a>
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
              }
            }

            document.getElementById("adaddtoBookmarks").innerHTML = str;
            setTimeout(() => {
              for (i in obj) {
                if (obj[i].adbookmark) {
                  document.getElementById(obj[i].name).innerHTML = `
            <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
            <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
            <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
            <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
            <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
            `;
                  for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
                    document.getElementById(obj[i].name + j).style =
                      "color:green";
                  }
                }
              }
            }, 100);
          }
        },
      });
    });
  });
}
if (window.location.href.indexOf("adcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/adcourses",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    $.get("http://localhost:3470/faculty-det/", function (obj, status) {
      temp = [];
      for (i in obj) {
        temp.push(obj[i].uploaded);
      }
      $.ajax({
        type: "GET",
        url: "http://localhost:3470/getTeacherImage",
        headers: {
          email: [temp],
        },
        success: function (data) {
          var str = "";

          for (let i = obj.length - 1; i >= 0; i--) {
            str += `<div class="card-courses-list admin-courses">
 
    <div class="card-courses-media " >
 
     <img src="../images/courses/pic1.jpg" alt="" />
 
    </div>
 
    <div class="card-courses-full-dec">
 
     <div class="card-courses-title">
 
      <h4>${obj[i].name}</h4>
 
     </div>
 
     <div class="card-courses-list-bx">
 
      <ul class="card-courses-view">
 
       <li class="card-courses-user">
 
        <div class="card-courses-user-pic">
 
         <img id="" src='${data[i][obj[i].uploaded]}' alt="" />
 
        </div>
 
        <div class="card-courses-user-info">
 
         <h5>Teacher</h5>
 
         <h6>${obj[i].uploaded}</h6>
 
        </div>
 
       </li>
 
       <li class="card-courses-categories">
 
        <h5>Category</h5>
 
        <h6>${obj[i].type}</h6>
 
       </li>
 
       <li class="card-courses-review">
 
        <h5>${obj[i].ratings.length} Ratings</h5>
 
        <ul class="cours-star" id="${obj[i].name}">
 
         
 
        </ul>
 
       </li>
 
       <li class="card-courses-price">
 
        <del>₹2000</del>
 
        <h5 class="text-primary">₹ ${obj[i].price}</h5>
 
       </li>
 
      </ul>
 
     </div>
 
     <div class="row card-courses-dec">
 
      <div class="col-md-12">
 
       <h6 class="m-b10">Course Description</h6>
 
       <p>${obj[i].description}
 
       </p>
 
      </div>`;

            if (obj[i].status) {
              str += `
      <div class="col-md-6">
 
 
      <a href = "#"class="btn violetblue outline radius-xl" onclick = "adaddtoBookmark('${obj[i]._id}')">Add to BookMarks</a>
 
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
            } else {
              str += `
      <div class="col-md-6">
 
 
      <a href="#" class="btn violetblue outline radius-xl" onclick = "approve('${obj[i].name}')">Appove</a>
 
       <a href="#" class="btn red outline radius-xl" onclick = "deleteCourse('${obj[i].name}')">Deny</a>
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
            }
          }

          document.getElementById("admincourse").innerHTML = str;
          for (i in obj) {
            document.getElementById(obj[i].name).innerHTML = `
          <li><i class="fa fa-star" id='${obj[i].name}1'></i></li>
          <li><i class="fa fa-star" id='${obj[i].name}2'></i></li>
          <li><i class="fa fa-star" id='${obj[i].name}3'></i></li>
          <li><i class="fa fa-star" id='${obj[i].name}4'></i></li>
          <li><i class="fa fa-star" id='${obj[i].name}5'></i></li>
          `;
            for (let j = 1; j <= Math.round(obj[i].averagerating); j++) {
              document.getElementById(obj[i].name + j).style = "color:green";
            }
          }
        },
      });
    });
  });
}
if (window.location.href.indexOf("adcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/adcourses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}

if (window.location.href.indexOf("add-courses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/add-courses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("areview") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/areview",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
if (window.location.href.indexOf("user-profile") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/user-profile",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
  $.get("http://localhost:3470/admin-profile", function (obj, status) {
    for (i in obj) {
      if (obj[i].email == JSON.parse(sessionStorage.getItem("email")).email) {
        document.getElementById(
          "profile"
        ).innerHTML = `<img src=${obj[i].uploadpicture}></img>`;

        document.getElementById("aname").value =
          obj[i].name != "undefined" ? obj[i].name : "";

        document.getElementById("aemail").value =
          obj[i].email != "undefined" ? obj[i].email : "";

        document.getElementById("aoccu").value =
          obj[i].occupation != "undefined" ? obj[i].occupation : "";

        document.getElementById("acom").value =
          obj[i].companyName != "undefined" ? obj[i].companyName : "";

        document.getElementById("aphon").value =
          obj[i].PhoneNo != "undefined" ? obj[i].PhoneNo : "";

        document.getElementById("aadd").value =
          obj[i].address != "undefined" ? obj[i].address : "";

        document.getElementById("acity").value =
          obj[i].city != "undefined" ? obj[i].city : "";

        document.getElementById("astate").value =
          obj[i].state != "undefined" ? obj[i].state : "";

        document.getElementById("apost").value =
          obj[i].postcode != "undefined" ? obj[i].postcode : "";

        document.getElementById("alikd").value =
          obj[i].linkedin != "undefined" ? obj[i].linkedin : "";

        document.getElementById("afb").value =
          obj[i].facebook != "undefined" ? obj[i].facebook : "";

        document.getElementById("atwt").value =
          obj[i].twitter != "undefined" ? obj[i].twitter : "";

        document.getElementById("ainst").value =
          obj[i].instagram != "undefined" ? obj[i].instagram : "";
      }
    }
  });
}
