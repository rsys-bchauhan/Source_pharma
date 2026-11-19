(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });
  }

  // Header shadow + back-to-top button on scroll
  var header = document.querySelector(".site-header");
  var backToTop = document.querySelector(".back-to-top");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Home hero slider
  var slider = document.querySelector(".hero-slider");
  if (slider) {
    var slides = slider.querySelectorAll(".slide");
    var dots = slider.querySelectorAll(".slider-dots button");
    var current = 0;
    var timer;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        var active = n === current;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", String(!active));
        s.querySelectorAll("a").forEach(function (a) { a.tabIndex = active ? 0 : -1; });
      });
      dots.forEach(function (d, n) {
        d.classList.toggle("is-active", n === current);
        d.setAttribute("aria-selected", String(n === current));
      });
    };
    var start = function () {
      if (reduceMotion || slides.length < 2) return;
      clearInterval(timer);
      timer = setInterval(function () { show(current + 1); }, 6000);
    };
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { show(n); start(); });
    });
    slider.addEventListener("mouseenter", function () { clearInterval(timer); });
    slider.addEventListener("mouseleave", start);
    start();
  }

  // Count-up numbers when the counters scroll into view
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1500, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + "+";
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  // Product category filter (also reads #category-slug from the URL)
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".product-card[data-category]");
  var applyFilter = function (cat) {
    var matched = false;
    buttons.forEach(function (b) {
      var on = b.getAttribute("data-filter") === cat;
      matched = matched || on;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    if (!matched) return applyFilter("all");
    cards.forEach(function (card) {
      card.hidden = cat !== "all" && card.getAttribute("data-category") !== cat;
    });
  };
  if (buttons.length) {
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        applyFilter(cat);
        history.replaceState(null, "", cat === "all" ? location.pathname : "#" + cat);
      });
    });
    var fromHash = function () { applyFilter(location.hash.slice(1) || "all"); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }
})();
