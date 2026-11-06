/* site.js: theme toggle and the mobile navigation menu. */
(function () {
  "use strict";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    var t = root.getAttribute("data-theme");
    return t || (media.matches ? "dark" : "light");
  }
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }
})();

/* "Upcoming" badges are rendered at build time; hide them once the date has passed,
 * since the site is only rebuilt on push. */
(function () {
  "use strict";
  var today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll(".badge[data-until]").forEach(function (b) {
    if (b.getAttribute("data-until") < today) b.hidden = true;
  });
})();
