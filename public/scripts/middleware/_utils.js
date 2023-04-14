// Check if logged in user is admin
const checkStatus = (callback) => {
  $.ajax({
    url: `/api/auth/status`,
    method: "GET",
    success: function (res) {
      // Check user session id to see if they are admin
      callback(res);
    },
    error: function () {},
  });
};
