// Ready for post
let imgUrl = "";

$(document).ready(function () {
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
      },
      error: () => {
        console.log("Error");
      },
    });
  });
});
