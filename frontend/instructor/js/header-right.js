document.getElementById("header-right").innerHTML= 
`<ul class="ttr-header-navigation">
	<li>
		<a href="#" class="ttr-material-button ttr-search-toggle"><i class="fa fa-search"></i></a>
	</li>
	<li>
		<a href="#" class="ttr-material-button ttr-submenu-toggle"><span class="ttr-user-avatar"><img alt="" src="../images/testimonials/pic3.jpg" width="32" height="32"></span></a>
		<li style="color : white; "><a href="../html/teacher-profile.html" >Hi, ${JSON.parse(sessionStorage.getItem("email")).name} </a></li>
		<li><a href="#" class="" style="margin : 20px" id="logout"><Button class="btn btn-primary">Logout</Button></a></li> 
	</li>
</ul>`


document.getElementById("logout").addEventListener("click",function(){
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("email");
	location.reload();
})