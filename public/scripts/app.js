$(document).ready(function () {
  // Listen on searchbar input and load products on change
  $("#searchbar").on("input", function (event) {
    query.setPage = 0;
    query.title = `&title=${event.target.value}`;

    // After setting new queries, load new products
    remountComponents("/api/products");
    $(window).on("scroll", () => listenScroll("/api/products"));
  });

  // Filter form init
  $("#filter-form").submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
    query.setPage = 0;
    query.filters = `&${$(this).serialize()}`;

    // After seting up new queries, load new products
    remountComponents("/api/products");
  });

  // Prevent search form from being submitted
  $("#search-form").submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

  // Check if logged in user is admin
  checkStatus((res) => {
    query.isAdmin = res.isAdmin;
    query.isLoggedIn = res.isLoggedIn;
    loadProducts("/api/products");
  });

  // Mount listener for scrolling
  $(window).on("scroll", () => listenScroll("/api/products"));
});
