 // show hide
 $(function () {
    $(window)
      .resize(function () {
        if (window.innerWidth > 991) {
          $(".smContact").hide();
          $(".contactBtn").show();
        } else {
          $(".smContact").show();
          $(".contactBtn").hide();
        }
      })
      .resize();
  });