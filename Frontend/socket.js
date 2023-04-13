const socket = io("ws://localhost:8900");


// socket.on("users", (usrs) => {
//   console.log(usrs);
// });

socket.on("getmessage", (msg) => {
  // console.log(msg);
  var str = "";
  if (
    sessionStorage.getItem("opid") !==
    JSON.parse(sessionStorage.getItem("email"))._id
  ) {
    document.getElementById("messages").innerHTML +=
      ` <li class="d-flex justify-content-between mb-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
            <div class="card w-100">
              <div class="card-body">
                <p class="mb-0">
                  ` +
      msg[0] +
      `
                </p>
              </div>
            </div>
          </li>`;
  }
  else{
    document.getElementById("messages").innerHTML +=
      ` <li class="d-flex justify-content-between mb-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
              alt="avatar"
              class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
            <div class="card w-100">
              <div class="card-body">
                <p class="mb-0">
                  ` +
      msg[0] +
      `
                </p>
              </div>
            </div>
          </li>`;
  }

});
