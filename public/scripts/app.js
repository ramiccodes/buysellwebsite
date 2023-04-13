// Query object and setters for managing query state
const query = {
  isAdmin: false,
  currentPage: 0,
  page: "?page=0",
  filters: "",
  title: "",

  setToFirstPage: function () {
    this.currentPage = 0;
  },

  nextPage: function () {
    this.currentPage++;
    this.page = `?page=${this.currentPage}`;
  },

  concatenate: function () {
    return this.page + this.filters + this.title;
  },

  set setPage(currentPage) {
    this.currentPage = currentPage;
    this.page = `?page=${currentPage}`;
  },

  reset: function () {
    this.page = "?page=0";
    this.filters = "";
    this.title = "";
  },
};

$(document).ready(function () {
  // Reset all filters, and empty out all rendered components
  const unmountComponents = () => {
    $("#products").empty();
    $(`#end-message`).empty();
  };

  // Remount all products by clearing children and requesting new products
  const remountComponents = () => {
    unmountComponents();
    loadProducts();
  };

  // Listen to page scroll;
  const listenScroll = () => {
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 1) {
      query.nextPage();
      loadProducts();
    }
  };

  // Render out warning message on screen
  const renderWarning = (message) => {

    // Empty out previous message
    $(`#end-message`).empty();
    $("#end-message").append(`
      <div class="card text-bg-warning ">
        <div class="card-body d-flex justify-content-center">
            ${message}
        </div>
      </div>
    `);
  };

  // Load products onto the page
  const loadProducts = () => {
    $.ajax({
      url: "/api/products" + query.concatenate(),
      method: "GET",
      dataType: "json",
      success: function ({ products }) {
        // If there are no more products, remove event listener for the window
        if (products.length === 0) {
          renderWarning("No more products to load");

          // Remove event listener when no more products
          $(window).off();
        }

        // Render cards after product has been requested
        renderCards(products);
      },
      error: function (err) {
        renderWarning("Error loading products");
      },
    });
  };

  // Render cards on the index page
  const renderCards = function (products) {
    $(".cards").addClass("row");
    for (const product of products) {
      const cardElement = createCardElement(product);
      $(".cards").append(cardElement);
    }
  };

  // Create and setup card element for render
  const createCardElement = function (product) {
    let $card = $(`
    <div class="col-md-6 col-sm-12 col-lg-4">
      <div class="card-wrapper">
        <div class="card">
          <div class="image-container">
            <a href="/product/${product.id}">
            <div class="square-image">
              <img src="${product.img}" class="img-fluid ${product.is_sold ? "sold" : ""}">
              <h2 class="overlay-text">${product.is_sold ? "SOLD" : ""}</h2>
            </div>
            </a>
            <button class="favorite-btn">
              <i class="fas fa-heart"></i>
            </button>
            ${
              query.isAdmin
                ? `
                <button class="delete-btn" data-id="${product.id}">
                <i class="fa-solid fa-xmark"></i>
                </button>
                <button class="sold-btn" data-id="${product.id}">
                  <i class="fa-solid fa-tag"></i>
                </button>
              `
                : ""
            }
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text float-right">$${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);

    // Toggle sold button and call query
    $card.find(".sold-btn").on("click", function () {
      const productId = product.id;
      const isSold = !product.is_sold;

      // Make an AJAX call to update the product
      $.ajax({
        url: `/api/products/${productId}/sold`,
        method: "PUT",
        dataType: "json",
        data: { is_sold: isSold },
        success: function (response) {
          // Update the product's sold status
          product.is_sold = isSold;

          // Toggle the "SOLD" overlay text visibility
          if (isSold) {
            return $card.find(".overlay-text").text("SOLD");
          }
          $card.find(".overlay-text").text("");
        },
        error: function () {
          renderWarning("Error setting to sold")
        },
      });
    });

    // Handle delete on button press
    $card.find(".delete-btn").on("click", function () {
      const productId = product.id;

      $.ajax({
        url: `/api/products/${productId}/delete`,
        method: "DELETE",
        dataType: "json",
        success: function (response) {
          if (response.message === "Product deleted!") {
            $card.remove(); // Remove the card from the DOM
          }
        },
        error: function () {
          renderWarning("Error deleting product")
        },
      });
    });

    return $card;
  };

  // Listen on searchbar input and load products on change
  $("#searchbar").on("input", function (event) {
    query.setPage = 0;
    query.title = `&title=${event.target.value}`;

    // After setting new queries, load new products
    remountComponents();
    $(window).on("scroll", listenScroll);
  });

  // Filter form init
  $("#filter-form").submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
    query.setPage = 0;
    query.filters = `&${$(this).serialize()}`;

    // After seting up new queries, load new products
    remountComponents();
  });

  // Check if logged in user is admin
  $.ajax({
    url: `/api/auth/admin`,
    method: "GET",
    success: function (response) {
      // Check user session id to see if they are admin
      query.isAdmin = response.isAdmin;
      loadProducts();
    },
    error: function (err) {},
  });

  // Mount listener for scrolling
  $(window).on("scroll", listenScroll);
});
