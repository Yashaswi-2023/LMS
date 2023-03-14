document.getElementById("Header").innerHTML=`
<div class="sticky-header navbar-expand-lg" style="top:0; left : 0; right 0; background-color:white;" >
        <div class="menu-bar clearfix" >
            <div class="container clearfix">
      <div class="menu-logo">
        <a href="index.html"><img src="assets/images/logo-white.png" alt=""></a>
      </div>
        <button class="navbar-toggler collapsed menuicon justify-content-end" type="button" data-toggle="collapse" data-target="" aria-controls="menuDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
                <div class="secondary-menu" >
                    <div class="secondary-inner">
                        <ul>
            <li><a href="https://www.facebook.com" class="btn-link"><i class="fa fa-facebook"></i></a></li>
            <li><a href="https://accounts.google.com/v3/signin/identifier?dsh=S-1291033703%3A1678390944099636&ifkv=AWnogHfQyifB9ooG-jLMcWN38JOdqQzy7wOppg8L34O6F3Km1hUs12L6G5mGl4Il93UZg31iWbm4&flowName=GlifWebSignIn&flowEntry=ServiceLogin" class="btn-link"><i class="fa fa-google-plus"></i></a></li>
            <li><a href="https://www.linkedin.com" class="btn-link"><i class="fa fa-linkedin"></i></a></li>
            <!-- Search Button ==== -->
            <li class="search-btn"><button id="quik-search-btn" type="button" class="btn-link"><i class="fa fa-search"></i></button></li>
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
          <a href="index.html"><img src="assets/images/logo.png" alt=""></a>
        </div>

        <a href="index.html" style="color: #ffffff; font-size: 15px; margin-right: 10px; color: black; " onmouseover="this.style.color = 'goldenrod'"  onmouseleave= "this.style.color = 'black'">HOME </a>
        <ul class="nav navbar-nav" >	
          </li>
          <li class="add-mega-menu"><a href="javascript:;">Our Courses <i class="fa fa-chevron-down"></i></a>
            <ul class="sub-menu add-menu">
              <li class="add-menu-left">
                <h5 class="menu-adv-title">Our Courses</h5>
                <ul>
                  <li><a href="courses.html">Courses </a></li>
                  <li><a href="courses-details.html">Courses Details</a></li>
                  <li><a href="membership.html">Membership</a></li>
                </ul>
              </li>
              <li class="add-menu-right">
                <a href="membership.html"><img src="assets/images/adv/adv.jpg" alt=""/></a>
              </li>
            </ul>
          </li>
          <li><a href="javascript:;">Pages <i class="fa fa-chevron-down"></i></a>
            <ul class="sub-menu">
              <li><a href="about-2.html">About<i class=""></i></a>
              </li>
              <li><a href="events-details.html">Event</a>
              </li>
              </li>
          </li>
          <li><a href="javascript:;">More Details<i class="fa fa-chevron-down"></i></a>
          <ul class="sub-menu">
            <li><a href="blog-standard-sidebar.html">Blog</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact-1.html">Contact Us<i class=""></i></a>
          </li>
        </li>
          </ul>
        </ul>
        </ul>
        <div class="nav-social-link">
          <a href="https://www,facebook.com"><i class="fa fa-facebook"></i></a>
          <a href="https://accounts.google.com/v3/signin/identifier?dsh=S721896348%3A1678397977974496&ifkv=AWnogHcj-OCh8ZPxIv1B4Qf22q8fFpKHEHsnl-wCdCGqxcmMiQyHDoYEcshnE0RP_75jpEhWk7rd9Q&flowName=GlifWebSignIn&flowEntry=ServiceLogin" class="btn-link"><i class="fa fa-google-plus"></i></a>
          <a href="https://www.linkedin.com"><i class="fa fa-linkedin"></i></a>
        </div>
                </div>
            </div>
        </div>
    </div>
</header>
<script>
		$(window).on('scroll',function(){
			if ($(window).scrollTop() > 150){
				$("Header").addClass('fixed');
			}
		})
	</script>
`