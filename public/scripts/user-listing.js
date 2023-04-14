$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/products/listings"));
  checkStatus((res) => {
    query.isAdmin = res.isAdmin;
    query.isLoggedIn = res.isLoggedIn;
    loadProducts("/api/products/listings");
  });
});
