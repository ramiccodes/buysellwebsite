// Client facing scripts here
// Ready for post

$(document).ready(function () {
  console.log(Cookies.get("user_id"))
  if ($.cookie("user_id")) {
    $("#nav-menu").append(`
        <li class="nav-item">
          <a class="nav-link" href="/auth/logout"> Logout </a>
        </li>
      `);
  }

  if (!$.cookie("user_id")) {
    $("#nav-menu").append(`
        <li class="nav-item">
          <a class="nav-link" href="/auth/login"> Login </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/auth/signup"> Signup </a>
        </li>
    `);
  }
});
