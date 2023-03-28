if(document.cookie == ''){
var cookies= document.cookie;
// console.log(cookies);
cookiesObj = {};
cookiesObj[cookies.split("=")[0]] = cookies.split("=")[1];
if(cookiesObj['logged'] != 'kkk'){
document.getElementById("ttr-header").innerHTML=`
<div class="ttr-header-wrapper">
  <div class="ttr-toggle-sidebar ttr-material-button">
    <i class="ti-close ttr-open-icon"></i>
    <i class="ti-menu ttr-close-icon"></i>
  </div>
  <div class="ttr-logo-box">
    <div>
      <a href="../html/adindex.html" class="ttr-logo">
        <img class="ttr-logo-desktop" alt="" src="../images/logo-white.png" width="50" height="27">
      </a>
    </div>
  </div>
  <div class="ttr-header-right ttr-with-seperator">
    <ul class="ttr-header-navigation">
      <li>
        <a href="#" class="ttr-material-button ttr-search-toggle"><i class="fa fa-search"></i></a>
      </li>
      <li>
        <a href="#" class="ttr-material-button ttr-submenu-toggle"><span class="ttr-user-avatar"><img alt=""
              src="../images/testimonials/pic3.jpg" width="50" height="50"></span></a>
        <li><a href="user-profile.html">Hi, ${JSON.parse(sessionStorage.getItem("email")).name}</a> </li>
              
            <li><a href="#" id="logout"><button class="btn">Logout</button></a></li>
        
    </ul>
  </div>
  <div class="ttr-search-bar">
    <form class="ttr-search-form">
      <div class="ttr-search-input-wrapper">
        <input type="text" name="qq" placeholder="search something..." class="ttr-search-input">
        <button type="submit" name="search" class="ttr-search-submit"><i class="ti-arrow-right"></i></button>
      </div>
      <span class="ttr-search-close ttr-search-toggle">
        <i class="ti-close"></i>
      </span>
    </form>
  </div>
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
      <a href="../html/adindex.html" class="ttr-logo">
        <img class="ttr-logo-desktop" alt="" src="../images/logo-white.png" width="50" height="27">
      </a>
    </div>
  </div>
  <div class="ttr-header-right ttr-with-seperator">
    <ul class="ttr-header-navigation">
      <li>
        <a href="#" class="ttr-material-button ttr-search-toggle"><i class="fa fa-search"></i></a>
      </li>
        <li>
            <a href="../login.html"><Button class="btn btn-primary">Login</Button></a>
        </li>
      </ul>
    </ul>
  </div>
  `
}
document.getElementById("logout").addEventListener("click",function(){
	// console.log("hii");
	sessionStorage.removeItem("email");
  sessionStorage.removeItem("token")
	window.location.replace("adindex.html");
	location.reload();
})
}