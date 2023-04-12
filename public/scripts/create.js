// Ready for post
let imgUrl = "";

$(document).ready(function () {
  $("#form").submit(function (event) {

    // Bootstrap validation
    event.preventDefault();
    event.stopPropagation();
    this.classList.add("was-validated");

    // Adds img URL to the end of the serialized string
    let queryString = `${$(this).serialize()}&img=${imgUrl}`;

    if (this.checkValidity()) {
      $.ajax({
        method: "POST",
        url: "/api/products",
        data: queryString,
        success: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  });

  $("#upload-image").change(function (event) {
    // Gets file from form, and formats it for POST
    file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file);

    // Don't process file and serialize; keep as is
    $.ajax({
      method: "POST",
      url: "/api/s3",
      data: formData,
      processData: false,
      contentType: false,
      success: (res) => {
        // Update url for form submission
        imgUrl = res.data.filename;
      },
      error: () => {
        console.log("Error");
      },
    });
  });
});
