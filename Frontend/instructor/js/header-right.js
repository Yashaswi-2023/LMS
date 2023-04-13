
if(sessionStorage.getItem("email")){
  document.getElementById("ttr-header").innerHTML=`
  <div class="ttr-header-wrapper">
  <div class="ttr-toggle-sidebar ttr-material-button">
    <i class="ti-close ttr-open-icon"></i>
    <i class="ti-menu ttr-close-icon"></i>
    
  </div>
  <div class="ttr-logo-box">
    <div>
      <a href="../html/tindex.html" class="ttr-logo">
        <img  class="ttr-logo-desktop" alt="" src="../images/logo-white.png" width="50" height="27">
      </a>
    </div>
  </div>

  </div>
  
  <div class="ttr-header-right">
    <ul class="ttr-header-navigation">
      <li>
        <a href="teacher-profile.html" class="ttr-material-button ttr-submenu-toggle"><span class="ttr-user-avatar"><img  alt="avatar"
              src="../../profile.jpg" id="ppic" width="50" height="50"></span></a>
        <li><a style="color : white;">Hi,Instructor</a> </li>
              
            <li><a href="#" id="logout"><button class="btn">Logout</button></a></li>
        
    </ul>
</div>
<srcipt src="script.js"></script>`
  }
  else{
    document.getElementById("ttr-header").innerHTML=
    `
    <div class="ttr-header-wrapper">
    <div class="ttr-toggle-sidebar ttr-material-button">
      <i class="ti-close ttr-open-icon"></i>
      <i class="ti-menu ttr-close-icon"></i>
    </div>
    <div class="ttr-logo-box">
      <div>
        <a href="../html/tindex.html" class="ttr-logo">
          <img class="ttr-logo-desktop" alt="" src="../images/logo-white.png" width="50" height="27">
        </a>
      </div>
    </div>
    <div class="ttr-header-right ttr-with-seperator">
      <ul class="ttr-header-navigation">
          <li>
              <a href="../login.html"><Button class="btn btn-primary">Login</Button></a>
          </li>
        </ul>
      </ul>
    </div>
    `
  }

document.getElementById("logout").addEventListener("click", function () {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  document.cookie = "logged = null"
  window.location.href= "../../learners/html/lindex.html"
});

$.get("http://localhost:3470/admin-home-i", function (obj, status) {
  for (i in obj)
    if (JSON.parse(sessionStorage.getItem("email")).email == obj[i].email) {
    //   console.log(obj[i]);
      if(obj[i].uploadpicture != undefined)
        document.getElementById("ppic").src = obj[i].uploadpicture;
    }
});
