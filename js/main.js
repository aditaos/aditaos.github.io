(function($) {
  "use strict"; // Start of use strict

  // Disable right click
  document.addEventListener("contextmenu", function(e){
    e.preventDefault();
  }, false);

  // Trigger cookie banner if not closed
  if (!localStorage.isBannerClosed) {
    $(".cookie-banner").css("display", "block");
  } else {
    $(".cookie-banner").css("display", "none");
  }

  $(".cookie-banner .btn").click(function() {
    localStorage.isBannerClosed = "true";

    $(".cookie-banner").addClass("closed");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Collapse the navbar when the menu button is clicked
  $(".navbar-toggler").click(function() {
    if ($("#navbar-main").offset().top > 100) {
      return;
    }

    if ($("#collapse-navbar").is(":visible")) {
      $("#navbar-main").removeClass("navbar-shrink");
    } else {
      $("#navbar-main").addClass("navbar-shrink");
    }
  });

  // Close the collapsible elements when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".collapse").collapse("hide");
  });

  // Activate the scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#navbar-main",
    offset: 56
  });

  // Collapse the navbar if needed
  var collapseNavbar = function() {
    $(".collapse").collapse("hide");

    if ($("#navbar-main").offset().top > 100) {
      $("#navbar-main").addClass("navbar-shrink");
    } else {
      $("#navbar-main").removeClass("navbar-shrink");
    }
  };

  // Collapse the navbar now if page is not at top
  collapseNavbar();

  // Collapse the navbar when page is scrolled
  $(window).scroll(collapseNavbar);

  // Show/hide the sticky buttons
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 400) {
      $(".sticky-buttons").fadeIn();
    } else {
      $(".sticky-buttons").fadeOut();
    }
  });

  // Toggle the CTA button
  $("#collapse-buttons").on("show.bs.collapse", function () {
    $(".call-to-action").addClass("expanded");

    $(".call-to-action .fa-phone").addClass("d-none");
    $(".call-to-action .fa-chevron-left").addClass("d-none");

    $(".call-to-action .fa-chevron-right").removeClass("d-none");
  });

  $("#collapse-buttons").on("hide.bs.collapse", function () {
    $(".call-to-action").removeClass("expanded");

    $(".call-to-action .fa-phone").removeClass("d-none");
    $(".call-to-action .fa-chevron-left").removeClass("d-none");

    $(".call-to-action .fa-chevron-right").addClass("d-none");
  });

  // Set the current copyright year
  document.getElementById("copyright").innerHTML += new Date().getFullYear().toString();

})(jQuery); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
  var that = $(this);
  that.on("click", onMapClickHandler);
  that.off("mouseleave", onMapMouseleaveHandler);
  that.find("iframe").css("pointer-events", "none");
}

var onMapClickHandler = function(event) {
  var that = $(this);

  // Disable the click handler until the user leaves the map area
  that.off("click", onMapClickHandler);

  // Enable scrolling zoom
  that.find("iframe").css("pointer-events", "auto");

  // Handle the mouse leave event
  that.on("mouseleave", onMapMouseleaveHandler);
}

// Enable map zooming with mouse scroll when the user clicks the map
$(".map").on("click", onMapClickHandler);
