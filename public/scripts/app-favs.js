$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/users/favorite"));
  // Check if logged in user is admin
  checkStatus((res) => {
    query.isAdmin = res.isAdmin;
    query.isLoggedIn = res.isLoggedIn;
    loadProducts("/api/users/favorite");
  });
});
