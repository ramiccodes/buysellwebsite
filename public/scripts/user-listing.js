$(document).ready(() => {
  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/products/listings"));

  // Check if logged in user is admin
  checkStatus((res) => {
    query.isAdmin = res.isAdmin;
    query.isLoggedIn = res.isLoggedIn;
    loadProducts("/api/products/listings");
  });
});
