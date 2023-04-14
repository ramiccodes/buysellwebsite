$(document).ready(function () {
  console.log("running");
  $("#email-form").submit(function (event) {
    event.preventDefault();

    const subject = $(this).attr("data-subject");
    const toEmail = $(this).attr("data-email").replace(/@/, "%40");
    const queryString = `${$(
      this
    ).serialize()}&subject=${subject}&to=${toEmail}`;

    $.ajax({
      method: "POST",
      url: "/api/contact/email",
      data: queryString,

      success: (res) => {
        $("#message").append(`
        <div class="card text-bg-success ">
          <div class="card-body ">
            <i class="fa-solid fa-check"></i></span>
            ${res.message}
          </div>
        </div>
        `);
      },

      error: (res) => {
        $("#message").append(`
        <div class="card text-bg-warning ">
          <div class="card-body">
            <i class="fa-solid fa-warning"></i></span>
            ${res.message}
          </div>
        </div>
        `);
      },
    });
  });
});
