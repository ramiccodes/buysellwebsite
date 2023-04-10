// Client facing scripts here
let isFilterOpen = false;

$(document).ready(function () {
  $("#filter-btn").click(() => {
    if (isFilterOpen) {
      isFilterOpen = false;
      return $(`#filter-form`).slideUp("fast");
    }

    if (!isFilterOpen) {
      isFilterOpen = true;

      // Need to wait for form to be focusable
      return $(`#filter-form`).slideDown("fast");
    }
  });
});
