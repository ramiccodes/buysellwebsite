let page = 0;
let isAdmin = false;
let queryString =

$(document).ready(function () {
  const loadProducts = () => {
    $.ajax({
      url: `/api/users/favorites?page=${page}`,
      
      method: "GET",
      dataType: "json",
      success: function (products) {
        // If the product is not 0, render
        if (products.products.length === 0) {
          $("#end-message").append(`
            <div class="card text-bg-warning ">
              <div class="card-body d-flex justify-content-center">
                  No more products to load!
              </div>
            </div>
          `);

          // Remove event listener when no more products
          $(window).off();
        }

        // Render cards after product has been requested
        renderCards(products.products);
        page++;
      },
      error: function (err) {
        $("#end-message").append(`
        <div class="card text-bg-warning ">
          <div class="card-body justify-content-center">
              Error loading products.
          </div>
        </div>
      `);
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
            <button class="favorite-btn" data-id="${product.id}">
              <i class="fas fa-heart"></i>
            </button>
            ${
              isAdmin
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
    
    
    // toggle sold button and call query
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
            $card.find(".overlay-text").text("SOLD");
          } else {
            $card.find(".overlay-text").text("");
          }
        },
        error: function (err) {
          console.error("Error updating product sold status:", err);
        },
      });
    });

    // delete item button
    $card.find(".delete-btn").on("click", function () {
      const productId = product.id;
      $.ajax({
        url: `/api/products/${productId}/delete`,
        method: "DELETE",
        dataType: "json",
        success: function (response) {
          if (response.message === "Product deleted!") {
            // Remove the card from the DOM
            $card.remove();
          }
        },
        error: function (err) {
          console.error("Error deleting product:", err);
        },
      });
    });

    $card.find(".favorite-btn").on("click", function () {
      $card.remove();
    });
    
    

    return $card;
  };

  // Listen to window scrolling
  $(window).on("scroll", function (event) {
    // don't load products if not at bottom of page
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 2) {
      // window.history.pushState("product", "Home Page", `/product?page=${page}`);
      loadProducts();
    }
  });

  // Filter form init
  $("#filter-form").submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());
  });

  // Load admin
  $.ajax({
    url: `/api/auth/admin`,
    method: "GET",
    success: function (response) {
      // Check user session id to see if they are admin
      isAdmin = response.isAdmin;
      loadProducts();
    },
    error: function (err) {},
  });
});
