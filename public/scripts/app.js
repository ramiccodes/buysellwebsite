
$(document).ready(function() {

  const loadProducts = () => {
    $.ajax({
      url: '/api/products',
      method: 'GET',
      dataType: 'json',
      success: function(products) {
        console.log(products);
        renderCards(products.products);
      },
      error: function(err) {
        console.error('Error fetching products:', err);
      }
    });
  }

  const renderCards = function(products) {
    $(".cards").empty().addClass("row");
    for (const product of products) {
      const cardElement = createCardElement(product);
      $(".cards").append(cardElement);
    }
  }

  const createCardElement = function(product) {
    let $card = $(`
    <div class="col-md-6 col-sm-12 col-lg-4">
      <div class="card-wrapper">
        <div class="card">
          <div class="image-container">
            <div class="square-image">
              <img src="${product.img}" class="img-fluid ${product.is_sold ? "sold" : ""}">
              <h2 class="overlay-text">${product.is_sold ? "SOLD" : ""}</h2>
            </div>
            <button class="favorite-btn">
              <i class="fas fa-heart"></i>
            </button>
            <button class="delete-btn" data-id="${product.id}">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="sold-btn" data-id="${product.id}">
              <i class="fa-solid fa-tag"></i>
            </button>
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


    $card.find('.sold-btn').on('click', function() {
      const productId = product.id;
      const isSold = !product.is_sold;

      // Make an AJAX call to update the product

      $.ajax({
        url: `/api/products/${productId}/sold`,
        method: 'PUT',
        dataType: 'json',
        data: { is_sold: isSold },
        success: function(response) {

          // Update the product's sold status

          product.is_sold = isSold;

          // Toggle the "SOLD" overlay text visibility

          if (isSold) {
            $card.find('.overlay-text').text('SOLD');
            $card.find('.img-fluid').addClass('sold');
          } else {
            $card.find('.overlay-text').text('');
            $card.find('.img-fluid').removeClass('sold');
          }
        },
        error: function(err) {
          console.error('Error updating product sold status:', err);
        }
      });
    });


    // delete item button


    $card.find('.delete-btn').on('click', function() {
      const productId = product.id;

      $.ajax({
        url: `/api/products/${productId}/delete`,
        method: 'DELETE',
        dataType: 'json',
        success: function(response) {
          if (response.message === "Product deleted!") {
            // Remove the card from the DOM
            $card.remove();
          }
        },
        error: function(err) {
          console.error('Error deleting product:', err);
        }
      });
    });





    return $card;

  }

  loadProducts();

});
