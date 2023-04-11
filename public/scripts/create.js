// Ready for post
$(document).ready(function () {
  $("#create-product").submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.classList.add("was-validated");

    // If all checks passes, then run ajax
    if (this.checkValidity()) {
      $.ajax({
        method: "POST",
        url: "/api/products",
        data: $(this).serialize(),
        success: () => {
          console.log("Success");
        },
        error: () => {
          console.log("Error");
        },
      });
    }
  });
});
