// Client facing scripts here

// var heartIcon = document.querySelector(".fas.fa-heart");

// heartIcon.addEventListener("click", function() {
//   heartIcon.style.color = "red";
// });

const renderCards = function(products) {
  $(".cards").empty();
  for(const product of products) {
    const cardElement = createCardElement(product);
    $(".cards").prepend(cardElement); 
  }
}

const createCardElement = function(product) {

  let $card = $(`
  <div class="col-md-6 col-sm-12 col-lg-4">
    <div class="card-wrapper">
      <div class="card">
        <div class="image-container">
          <div class="square-image">
            <img src="${product.img}" class="img-fluid">
            <h2 class="overlay-text">${product.is_sold ? "SOLD" : ""}</h2>
          </div>
          <button class="favorite-btn">
            <i class="fas fa-heart"></i>
          </button>
          <button class="delete-btn">
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
        loadProducts();
      },
      error: function(err) {
        console.error('Error updating product sold status:', err);
      }
    });
  });

  return $card;
}

$(document).ready(function() {

  function loadProducts() {

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

  loadProducts();


});
