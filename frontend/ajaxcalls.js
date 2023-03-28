if (window.location.href.indexOf("lindex") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lindex",
      headers: {
        token: sessionStorage.getItem("token"),
      },
      error: function (err, msg) {
        if (err.status == "405") window.location.href = "lprofile.html";
      },
      success: function (data) {
        console.log(data);
      },
    });
  });
}

function buynow(id) {
  if (window.location.href.indexOf("courses-details") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/courses-details",
      contentType: "application/json",
      data: JSON.stringify({
        stud_id: JSON.parse(sessionStorage.getItem("email")).email,
        corid: id,
      }),
      success: function (data) {
        res.send();
      },
    });
    alert("bought course");
    window.location.href = "lcourses.html";
  }
}

function register() {
  if (window.location.href.indexOf("lregister") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/lregister",
      contentType: "application/json",
      data: JSON.stringify({
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      }),
      success: function (data) {
        console.log(data);
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        window.location.href = "llogin.html";
      },
    });
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
      success: function (data) {
        console.log(data);
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        window.location.href = "tlogin.html";
      },
    });
  }
}
function details(data1) {
  sessionStorage.setItem("id-crs", data1);
}
function check(data) {
  console.log(data);
  document.getElementById(data).checked = true;
  // document.getElementById(data).disabled = true;
  if (window.location.href.indexOf("course-buy") >= 0) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lprogress",
      contentType: "application/json",
      headers: {
        email: sessionStorage.getItem("email"),
        moduleID: data,
      },
    });
  }
}
// $.ajax({
//   type : "GET",
//   url: "http://localhost:3470/progress-det",
//   contentType : "application/json",
//   headers : {
//     email : sessionStorage.getItem("email"),
//     moduleID : data,
//   }
// })

function upload() {
  var arr = $(".mname");
  var tem_arr = [];
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    tem_arr.push(arr[i].value);
  }
  var arr = $(".mvideo");
  var tem_arr1 = [];
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    tem_arr1.push(arr[i].value);
  }
  var arr = $(".mquiz");
  var tem_arr2 = [];
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    tem_arr2.push(arr[i].value);
  }
  if (window.location.href.indexOf("add-listing") >= 0) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/add-listing",
      contentType: "application/json",
      data: JSON.stringify({
        name: $("#cname").val(),
        description: $("#cdes").val(),
        prerequisites: $("#cpreq").val().split(","),
        price: $("#cprice").val(),
        uploaded: JSON.parse(sessionStorage.getItem("email")).email,
        modules: tem_arr,
        videos: tem_arr1,
        quiz: tem_arr2,
        students: [],
        type: $("#typ").val(),
      }),
      success: function (data) {},
    });
  }
  alert("Course Added");
  location.reload();
}

function resetData() {
  document.getElementById("change1").value = "";

  document.getElementById("change2").value = "";

  document.getElementById("change3").value = "";
}

function removeUser(email) {
  console.log("firstttt");

  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/deleteUI",

      headers: {
        email: email,
      },

      error: function (err, msg) {
        if (err.status == "405") window.location.href = "alogin.html";
      },

      success: function (data) {
        console.log("1234567890");
      },
    });
  });

  location.reload();
}

function deleteCourse(id) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/deleteCourse",

      headers: {
        id: id,
      },

      error: function (err, msg) {
        if (err.status == "405") window.location.href = "alogin.html";
      },

      success: function (data) {
        console.log("1234567890");
      },
    });
  });

  location.reload();
}

function changePassword() {
  if (window.location.href.indexOf("lprofile") >= 0) {
    if ($("#change2").val() == "") {
      document.getElementById("changing").innerHTML =
        "<p style='color:red'>Please enter valid password</p>";

      resetData();
    } else if ($("#change2").val() === $("#change3").val()) {
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

        success: function () {
          resetData();

          document.getElementById("changing").innerHTML =
            "<p style='color:green'>Password successfully changed</p>";
        },

        error: function () {
          console.log("Failed");

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
function login() {
  if (window.location.href.indexOf("llogin") >= 0) {
    // console.log($("#usr").val());
    $.ajax({
      type: "POST",
      url: "http://localhost:3470/llogin",
      contentType: "application/json",
      data: JSON.stringify({
        email: $("#usr").val(),
        password: $("#psw").val(),
      }),
      success: function (data) {
        console.log(data);
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
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
      success: function (data) {
        console.log(data);
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
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
      success: function (data) {
        sessionStorage.setItem("token", data[0]);
        sessionStorage.setItem("email", JSON.stringify(data[1]));
        window.location.href = "adindex.html";
      },
    });
  }
}
if (window.location.href.indexOf("lprofile") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/profile",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        // console.log(message, err)
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
      success: function (data) {
        $("#ndisp").html(data.name);
        $("#mdisp").html(data.email);
        $("#change").val(data.email);
      },
    });
  });
  var str = "";
  $.get("http://localhost:3470/admin-home-l/", function (obj, status) {
    for (i in obj) {
      if (obj[i]._id == JSON.parse(sessionStorage.getItem("email"))._id) {
        var z = obj[i].bought;
        for (j in z) {
          str += `
            <li class="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 pending">
            <div class="cours-bx">
              <div class="action-box">
                <img src="../images/courses/pic1.jpg" alt="">
                <a href="course-buy.html" class="btn" onclick= "details('${z[j]._id}')">Read More</a>
              </div>
              <div class="info-bx text-center">
                <h5><a href="#">${z[j]["name"]}</a></h5>
                <span>${z[j]["type"]}</span>
              </div>
                <div class="review" style = "display : grid; justify-content : center">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 3 Review</span>
                  <ul class="cours-star">
                    <li class="active"><i class="fa fa-star"></i></li>
                    <li class="active"><i class="fa fa-star"></i></li>
                    <li class="active"><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                  </ul>
                </div>
            </div>
          </li>
            `;
        }
      }
    }
    $("#masonry").html(str);
  });
} else if (window.location.href.indexOf("courses-details") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/courses-details",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });

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
                      <a href="#" class="btn radius-xl text-uppercase" onclick="buynow('${
                        obj[i]._id
                      }')">Buy This Course</a>
                    </div>
                    <div class="teacher-bx">
                      <div class="teacher-info">
                        <div class="teacher-thumb">
                          <img src="../images/testimonials/pic1.jpg" alt="" />
                        </div>
                        <div class="teacher-name">
                          <h5>${obj[i].uploaded.split("@")[0]}</h5>
                          <span>Teacher</span>
                        </div>
                      </div>
                    </div>
                    <div class="cours-more-info">
                      <div class="review">
                        <span>3 Review</span>
                        <ul class="cours-star">
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
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
                          <a class="nav-link" href="#curriculum"
                            ><i class="ti-bookmark-alt"></i>Curriculum</a
                          >
                        </li>
                        <li>
                          <a class="nav-link" href="#instructor"
                            ><i class="ti-user"></i>Instructor</a
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
                      <a href="#"><img src="../images/blog/default/thum1.jpg" alt="" /></a>
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
                            <span class="value">--update--</span>
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
                      <div class="instructor-author">
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
                      <p>--update--</p>
                    <div class="review-bx">
                      <div class="all-review">
                        <h2 class="rating-type">3</h2>
                        <ul class="cours-star">
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                        </ul>
                        <span>3 Rating</span>
                      </div>
                      <div class="review-bar">
                        <div class="bar-bx">
                          <div class="side">
                            <div>5 star</div>
                          </div>
                          <div class="middle">
                            <div class="bar-container">
                              <div class="bar-5" style="width: 90%"></div>
                            </div>
                          </div>
                          <div class="side right">
                            <div>150</div>
                          </div>
                        </div>
                        <div class="bar-bx">
                          <div class="side">
                            <div>4 star</div>
                          </div>
                          <div class="middle">
                            <div class="bar-container">
                              <div class="bar-5" style="width: 70%"></div>
                            </div>
                          </div>
                          <div class="side right">
                            <div>140</div>
                          </div>
                        </div>
                        <div class="bar-bx">
                          <div class="side">
                            <div>3 star</div>
                          </div>
                          <div class="middle">
                            <div class="bar-container">
                              <div class="bar-5" style="width: 50%"></div>
                            </div>
                          </div>
                          <div class="side right">
                            <div>120</div>
                          </div>
                        </div>
                        <div class="bar-bx">
                          <div class="side">
                            <div>2 star</div>
                          </div>
                          <div class="middle">
                            <div class="bar-container">
                              <div class="bar-5" style="width: 40%"></div>
                            </div>
                          </div>
                          <div class="side right">
                            <div>110</div>
                          </div>
                        </div>
                        <div class="bar-bx">
                          <div class="side">
                            <div>1 star</div>
                          </div>
                          <div class="middle">
                            <div class="bar-container">
                              <div class="bar-5" style="width: 20%"></div>
                            </div>
                          </div>
                          <div class="side right">
                            <div>80</div>
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
    document.getElementById("crs-det").innerHTML = str;
    for (i in obj) {
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
        for (let j = 0; j < obj[i].modules.length; j++) {
          document.getElementById("curriculum").innerHTML += `
                  <li>
                    <div class="curriculum-list-box">
                      <span>Module ${j + 1}.</span> <b>${obj[i].modules[j]}</b>
                    </div>
                    <span>--update-- minutes</span>
                  </li>
          `;
        }
      }
    }
  });
} else if (window.location.href.indexOf("course-buy") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/course-buy",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
  $.get("http://localhost:3470/faculty-det/", function (obj, status) {
    var str = "";
    for (i in obj) {
      // console.log(obj[i]._id, sessionStorage.getItem("id-crs"));
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
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
                          <img src="../images/testimonials/pic1.jpg" alt="" />
                        </div>
                        <div class="teacher-name">
                          <h5>${obj[i].uploaded.split("@")[0]}</h5>
                          <span>Teacher</span>
                        </div>
                      </div>
                    </div>
                    <div class="cours-more-info">
                      <div class="review">
                        <span>3 Review</span>
                        <ul class="cours-star">
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li class="active"><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
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
                          <a class="nav-link" href="#curriculum"
                            ><i class="ti-bookmark-alt"></i>Curriculum</a
                          >
                        </li>
                        <li>
                          <a class="nav-link" href="#instructor"
                            ><i class="ti-user"></i>Instructor</a
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
                      <a href="#"><img src="../images/blog/default/thum1.jpg" alt="" /></a>
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
                            <span class="value">--update--</span>
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
                      <div class="instructor-author">
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
                </div>
              </div>
              
                `;
      }
    }
    document.getElementById("crs-det").innerHTML = str;
    for (i in obj) {
      if (obj[i]._id == sessionStorage.getItem("id-crs")) {
        for (let j = 0; j < obj[i].modules.length; j++) {
          document.getElementById("curriculum").innerHTML += `
                  <ul>
                    <div class="curriculum-list-box card" style="border-radius : 30px; padding : 10px; background-color : #d5d5d5">
                      <li>
                      <span> <a target = "_blank" href="../images/video.mp4" onclick=check('${
                        obj[i]._id
                      }+${j + 1}video')>${
            j + 1
          }.&nbsp;<b style= "text-transform: uppercase;">${
            obj[i].modules[j]
          }</b></a> </span>
                      <span style="display: grid; justify-content : end" >--update-- minutes</span>
                      <input type="checkbox" id="${obj[i]._id}+${
            j + 1
          }video" style="display: flex; justify-content : right">
                      </li>
                    </div>
                  </ul>
                  <br>
          `;
        }
      }
    }
  });
} else if (window.location.href.indexOf("forget-password") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/forget-password",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("lcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/lcourses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "llogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
  sessionStorage.removeItem("id-crs");
  $.get("http://localhost:3470/faculty-det/", function (obj, status) {
    var str = "";
    for (i in obj) {
      str += `
                <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
										<div class="cours-bx" >
                <div class="action-box">
                    <img src="../images/courses/pic1.jpg" alt="">
                    <a href="courses-details.html" onclick= "details('${obj[i]._id}')" class="btn">Read More</a>
                </div>
                <div class="info-bx text-center">
                    <h5><a href="courses-details.html">${obj[i].name}</a></h5>
                    <span>${obj[i].type}</span>
                </div>
                <div class="cours-more-info">
                    <div class="review">
                        <span>3 Review</span>
                        <ul class="cours-star">
                            <li class="active"><i class="fa fa-star"></i></li>
                            <li class="active"><i class="fa fa-star"></i></li>
                            <li class="active"><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
                            <li><i class="fa fa-star"></i></li>
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
    document.getElementById("cors").innerHTML = str;
  });
} else if (window.location.href.indexOf("teacher-profile") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/teacher-profile",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("add-listing") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/add-listing",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("tcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/tcourses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("treview") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/treview",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("tbookmark") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/tbookmark",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("added") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/added",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("tindex") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/tindex",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "tlogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("adindex") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/adindex",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
  console.log();
  var str = "";
  $.get("http://localhost:3470/admin-home-l/", function (obj, status) {
    for (i in obj) {
      str += `<li>

      <span class="new-users-pic" >
   
        <img class="mar" src="../images/testimonials/pic3.jpg" alt="" / width=30px height=30px> 
   
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
  console.log();
  var str1 = "";
  $.get("http://localhost:3470/admin-home-i/", function (obj, status) {
    for (i in obj) {
      str1 += `<li>

      <span class="new-users-pic" >

        <img class="mar" src="../images/testimonials/pic3.jpg" alt="" / width=30px height=30px> 

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
} else if (window.location.href.indexOf("abookmark") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/abookmark",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("adcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/adcourses",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        console.log(message, err);

        if (err.status == "404") window.location.href = "alogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    $.get("http://localhost:3470/faculty-det/", function (obj, status) {
      var str = "";

      for (i in obj) {
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
 
         <img src="../images/testimonials/pic3.jpg" alt="" />
 
        </div>
 
        <div class="card-courses-user-info">
 
         <h5>Teacher</h5>
 
         <h4>${obj[i].uploaded.split("@")[0]}</h4>
 
        </div>
 
       </li>
 
       <li class="card-courses-categories">
 
        <h5>Category</h5>
 
        <h4>${obj[i].type}</h4>
 
       </li>
 
       <li class="card-courses-review">
 
        <h5>3 Review</h5>
 
        <ul class="cours-star">
 
         <li class="active"><i class="fa fa-star"></i></li>
 
         <li class="active"><i class="fa fa-star"></i></li>
 
         <li class="active"><i class="fa fa-star"></i></li>
 
         <li><i class="fa fa-star"></i></li>
 
         <li><i class="fa fa-star"></i></li>
 
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
 
      <div class="col-md-12">
 
       <a href="#" class="btn red outline radius-xl" onclick = "deleteCourse('${
         obj[i]._id
       }')">Delete</a>
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
      }

      document.getElementById("admincourse").innerHTML = str;
    });

    // console.log(str);
  });
} else if (window.location.href.indexOf("adcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/adcourses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("adcourses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",

      url: "http://localhost:3470/adcourses",

      headers: {
        token: sessionStorage.getItem("token"),

        email: sessionStorage.getItem("email"),
      },

      error: function (err, message) {
        console.log(message, err);

        if (err.status == "404") window.location.href = "alogin.html";

        if (err.status == "401") window.location.href = "error-404.html";
      },
    });

    $.get("http://localhost:3470/faculty-det/", function (obj, status) {
      var str = "";

      for (i in obj) {
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
 
         <img src="../images/testimonials/pic3.jpg" alt="" />
 
        </div>
 
        <div class="card-courses-user-info">
 
         <h5>Teacher</h5>
 
         <h4>${obj[i].uploaded.split("@")[0]}</h4>
 
        </div>
 
       </li>
 
       <li class="card-courses-categories">
 
        <h5>Category</h5>
 
        <h4>${obj[i].type}</h4>
 
       </li>
 
       <li class="card-courses-review">
 
        <h5>3 Review</h5>
 
        <ul class="cours-star">
 
         <li class="active"><i class="fa fa-star"></i></li>
 
         <li class="active"><i class="fa fa-star"></i></li>
 
         <li class="active"><i class="fa fa-star"></i></li>
 
         <li><i class="fa fa-star"></i></li>
 
         <li><i class="fa fa-star"></i></li>
 
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
 
      <div class="col-md-12">
 
       <a href="#" class="btn red outline radius-xl" onclick = "deleteCourse('${
         obj[i]._id
       }')">Delete</a>
 
      </div>
 
     </div>
 
 
 
    </div>
 
   </div>
 
  `;
      }

      document.getElementById("admincourse").innerHTML = str;
    });

    // console.log(str);
  });
} else if (window.location.href.indexOf("add-courses") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/add-courses",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("areview") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/areview",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
} else if (window.location.href.indexOf("user-profile") >= 0) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3470/user-profile",
      headers: {
        token: sessionStorage.getItem("token"),
        email: sessionStorage.getItem("email"),
      },
      error: function (err, message) {
        console.log(message, err);
        if (err.status == "404") window.location.href = "alogin.html";
        if (err.status == "401") window.location.href = "error-404.html";
      },
    });
  });
}
