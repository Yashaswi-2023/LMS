const cookies= document.cookie;
// console.log(cookies);
cookiesObj = {};
cookiesObj[cookies.split("=")[0]] = cookies.split("=")[1];
if(cookiesObj['logged'] != 'kkk') {
    document.getElementById("header-right").innerHTML= 
    `<ul class="ttr-header-navigation">
        <li>
            <a href="#" class="ttr-material-button ttr-search-toggle"><i class="fa fa-search"></i></a>
        </li>
        <li>
            <a href="#" class="ttr-material-button ttr-submenu-toggle"><span class="ttr-user-avatar"><img alt="" src="assets/images/testimonials/pic3.jpg" width="32" height="32"></span></a>
            <div class="ttr-header-submenu">
                <ul>
                    <li>Hi,${cookiesObj['logged'].split("%40")[0]} </li>
                    <li><a href="teacher-profile.html">My profile</a></li>
                    <li><a href="tlogin.html" id="logout">Logout</a></li>
                </ul>
            </div>
        </li>
    </ul>`
}
else {
    document.getElementById("header-right").innerHTML = `
    <ul class="ttr-header-navigation">
    <li>
        <a href="#" class="ttr-material-button ttr-search-toggle"><i class="fa fa-search"></i></a>
    </li>
    <li>
            <a href="../login.html"><Button class="btn btn-primary">Login</Button></a>
    </li>
    `
}
document.getElementById("logout").addEventListener("click",function(){
    // console.log("hii");
    document.cookie = "logged = kkk;";
    window.location.replace("index.html");
    location.reload();
})