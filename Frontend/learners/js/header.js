if(sessionStorage.getItem("email") != null){
document.getElementById("Header").innerHTML=`
<div class="sticky-header navbar-expand-lg" >
<div class="menu-bar clearfix">
  <div class="container clearfix">
    <div class="menu-logo">
      <a href="lprofile.html"><img src="../images/logo-black.png" alt=""></a>
    </div>
    <button class="navbar-toggler collapsed menuicon justify-content-end" type="button" data-toggle="collapse"
      data-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false"
      aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="secondary-menu">
      <div class="secondary-inner">
        <ul>
        
          <li><a href="https://www.facebook.com" class="btn-link"><i class="fa fa-facebook"></i></a></li>
          <li><a
              href="https://accounts.google.com/v3/signin/identifier?dsh=S721896348%3A1678397977974496&ifkv=AWnogHcj-OCh8ZPxIv1B4Qf22q8fFpKHEHsnl-wCdCGqxcmMiQyHDoYEcshnE0RP_75jpEhWk7rd9Q&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              class="btn-link"><i class="fa fa-google-plus"></i></a></li>
          <li><a href="https://linkedin.com" class="btn-link"><i class="fa fa-linkedin"></i></a></li>
          
        </ul>
      </div>
    </div>
    <div class="nav-search-bar">
      <form action="#">
        <input name="search" value="" type="text" class="form-control" placeholder="Type to search">
        <span><i class="ti-search"></i></span>
      </form>
      <span id="search-remove"><i class="ti-close"></i></span>
    </div>
    <div class="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
      <div class="menu-logo">
        <a href="index.html"><img src="../images/logo-white.png" alt="" style="padding : 0px"></a>
      </div>

      <ul class="nav navbar-nav">
        <li class="add-mega-menu">
        <a href="lprofile.html" >HOME </a>
        </li>
        <li class="add-mega-menu"><a href="about.html">About </i></a>
        </li>
        <li class="add-mega-menu"><a href="lcourses.html">Our Courses </i></a>
        </li>
        </li>
        <li><a href="contact.html">Contact Us </i></a>
        </li>
        <li><a href="#" data-toggle="modal" data-target="#exampleModal" class="" class="add-mega-menu">Take Notes</a></li>
        <li><a href="lc123.html" class="add-mega-menu">Online Compiler</a></li>
      </ul>
      </ul>
      </ul>
    </div>
  </div>
</div>
</div>`
}
else{
  document.getElementById("Header").innerHTML=`
<div class="sticky-header navbar-expand-lg" >
<div class="menu-bar clearfix">
  <div class="container clearfix">
    <div class="menu-logo">
      <a href="lprofile.html"><img src="../images/logo-black.png" alt=""></a>
    </div>
    <button class="navbar-toggler collapsed menuicon justify-content-end" type="button" data-toggle="collapse"
      data-target="#menuDropdown" aria-controls="menuDropdown" aria-expanded="false"
      aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="secondary-menu">
      <div class="secondary-inner">
        <ul>
        
          <li><a href="https://www.facebook.com" class="btn-link"><i class="fa fa-facebook"></i></a></li>
          <li><a
              href="https://accounts.google.com/v3/signin/identifier?dsh=S721896348%3A1678397977974496&ifkv=AWnogHcj-OCh8ZPxIv1B4Qf22q8fFpKHEHsnl-wCdCGqxcmMiQyHDoYEcshnE0RP_75jpEhWk7rd9Q&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              class="btn-link"><i class="fa fa-google-plus"></i></a></li>
          <li><a href="https://linkedin.com" class="btn-link"><i class="fa fa-linkedin"></i></a></li>
          
        </ul>
      </div>
    </div>
    <div class="nav-search-bar">
      <form action="#">
        <input name="search" value="" type="text" class="form-control" placeholder="Type to search">
        <span><i class="ti-search"></i></span>
      </form>
      <span id="search-remove"><i class="ti-close"></i></span>
    </div>
    <div class="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
      <div class="menu-logo">
        <a href="index.html"><img src="../images/logo-white.png" alt="" style="padding : 0px"></a>
      </div>

      <ul class="nav navbar-nav">
        <li class="add-mega-menu">
        <a href="lprofile.html" >HOME </a>
        </li>
        <li class="add-mega-menu"><a href="about.html">About </i></a>
        </li>
        <li class="add-mega-menu"><a href="lcourses.html">Our Courses </i></a>
        </li>
        <li><a href="membership.html">Membership </i></a>
        </li>
        <li><a href="contact.html">Contact Us </i></a>
        </li>
      </ul>
      </ul>
      </ul>
    </div>
  </div>
</div>
</div>`
}