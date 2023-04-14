// Check if logged in user is admin
const checkAdmin = (callback) => {
  $.ajax({
    url: `/api/auth/admin`,
    method: "GET",
    success: function (res) {
      // Check user session id to see if they are admin
      callback(res);
    },
    error: function () {},
  });
};
