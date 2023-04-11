$(document).ready(function () {
  $("#create-product").submit(function (event) {
    event.preventDefault()

    $.ajax({
      method: "POST",
      url: '/api/products',
      data: $(this).serialize(),
      success: (() => {
        console.log("Success")
      }),
      error: (()=>{
        console.log("Error")
      })
    })
  });
});
