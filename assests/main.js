$(document).ready(function () {
  $(".header-nav-toggler").click(function () {
    $("#mainMenu").addClass("mobile-nav-show");
    $("#mainMenu").removeClass("collapse");
    $(".close-menu-btn").addClass("btn-show");
    $(this).css("opacity", 0);
  });

  $(".close-menu-btn").click(function () {
    $("#mainMenu").removeClass("mobile-nav-show");
    $("#mainMenu").addClass("collapse");
    $(".close-menu-btn").removeClass("btn-show");
    $(".header-nav-toggler").css("opacity", 1);
  });

  // Testimonials Slider
  let margin = 0;
  const testimonials = document.querySelectorAll(".testimonial-item");
  const maps = document.querySelectorAll(".testimonial-mapper div");

  const select = (ele, all = false) => {
    if (all) {
      return [...document.querySelectorAll(ele)];
    } else {
      return document.querySelector(ele);
    }
  };

  (function slideLeft() {
    if (margin < -400) margin = 0;
    $(".testimonial-inner").css("marginLeft", `${margin}%`);
    margin -= 100;
    mapping(margin);
    setTimeout(slideLeft, 3000);
  })();

  // mapping
  function mapping(margin) {
    for (item of testimonials) {
      $(".testimonial-mapper div").each((i, map) => {
        $(`#${map.id}`).css("background", "transparent");
        if (margin.toString()[1] == map.id) {
          $("#" + map.id).css("background", "blue");
        }
      });
    }
  }

  $(select(".testimonial-mapper div", true)).each(function (idx, ele) {
    ele.addEventListener("click", (e) => {
      const getMapLocation = (e.target.id - 1) * -100;
      margin = getMapLocation; // reset auto slider position

      $(select(".testimonial-mapper div", true)).each((idx, map) => {
        map.style.background = "transparent";
      });
      $(select(".testimonial-inner")).css("marginLeft", getMapLocation + "%"); // testimonial item style
      e.target.style.background = "blue";
    });
  });

  $(document).on("scroll", function () {
    let windowTopEdge = $(window).scrollTop();
    let windowBottomEdge = windowTopEdge + $(window).height();

    // Change Fixed Header Background
    if (windowTopEdge > 200) {
      $("#header").css({ background: "white", "padding-top": ".5rem" });
      $("#goTop").css("display", "block");
    } else {
      $("#header").css({ background: "transparent", "padding-top": "1rem" });
      $("#goTop").css("display", "none");
    }

    // Active Links Hightlight
    $('#header a[href^="#"]').each(function () {
      const target = $(this);
      let removeHash = target.attr("href").split("");
      removeHash.shift();
      let refEle = document.getElementById(removeHash.join(""));
      let offset = 100;

      if (target.attr("href").length > 1 && refEle) {
        if (
          refEle.offsetTop <= windowTopEdge &&
          refEle.offsetTop + refEle.offsetHeight > windowTopEdge
        ) {
          $('#header a[href^="#"]').removeClass("current");
          target.addClass("current");
        }
      }
    });
  });
});
