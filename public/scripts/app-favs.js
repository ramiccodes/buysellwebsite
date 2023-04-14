$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/users/favorite"));
  loadProducts("/api/users/favorite");
});
