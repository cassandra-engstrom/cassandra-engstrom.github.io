// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
});

// Video fallback: if a video fails to load (missing file, unsupported
// codec, blocked by browser/extension), hide the player and show a
// message + download link instead of a broken box.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".video-wrap").forEach(function (wrap) {
    var video = wrap.querySelector("video");
    var fallback = wrap.querySelector(".video-fallback");
    if (!video || !fallback) return;
    video.addEventListener(
      "error",
      function () {
        video.hidden = true;
        fallback.hidden = false;
      },
      true
    );
  });
});


// Lazy-play: only load/play videos once they're actually visible,
// and pause them when scrolled away. Prevents mobile browsers from
// choking on many videos all trying to autoplay/preload at once.
document.addEventListener("DOMContentLoaded", function () {
  var videos = document.querySelectorAll(".card-media video.thumb");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(function () {
            /* ignore - browser may still be blocking autoplay for other reasons */
          });
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach(function (video) {
    observer.observe(video);
  });
});
