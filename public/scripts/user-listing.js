$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/users/listings"));
  loadProducts("/api/users/listings");
});
