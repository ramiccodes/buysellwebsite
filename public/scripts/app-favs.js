$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/users/favorite"));

  // Check if logged in user is admin
    loadProducts("/api/users/favorite");
});
