// Ready for post

// Only works for text inputs
function renderTextOnInput(name) {
  $("#input-" + name).on("input", function (event) {
    $("#card-" + name).text(event.target.value);
  });
}

$(document).ready(function () {
  // If page reloads, it should take the values inside the input
  $("#card-title").text($("#input-title").val());
  $("#card-price").text("$" + $("#input-price").val());
  $("#card-category").text($("#input-category").val());

  // Listent to any inputs on page, and render
  renderTextOnInput("title");
  renderTextOnInput("price");
  renderTextOnInput("description");
  $("#input-category").change(function (event) {
    const text = $(this).find(":selected").val();
    $("#card-category").text(text);
  });

  // Upload image on form input
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
        $("#img").val(res.data.filename);
        $("#card-img").css(
          "background-image",
          "url(" + res.data.filename + ")"
        );
      },
      error: () => {
        console.log("Error");
      },
    });
  });
});
