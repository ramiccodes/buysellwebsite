$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/products/listings"));
  loadProducts("/api/products/listings");
});
