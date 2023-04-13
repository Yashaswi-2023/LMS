// Initialize the Google Sign-In API

window.onload("auth2", () => {
  gapi.auth2.init({
    client_id: "281426821325-srs4ne42kl4477ddjvm488v875nms4od.apps.googleusercontent.com",
  });

  // Render the Google Sign-In button

  gapi.signin2.render("google-signin-button", {
    scope: "profile email",

    width: 240,

    height: 50,

    longtitle: true,

    theme: "dark",

    onsuccess: onGoogleSignIn,
  });
});

// Handle successful Google sign-in

function onGoogleSignIn(googleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;

  $("#google-token").val(googleToken);

  $("#login-form").submit();
}
