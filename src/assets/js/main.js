(function () {
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

  // Product category filter
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".product-card[data-category]");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      cards.forEach(function (card) {
        card.hidden = cat !== "all" && card.getAttribute("data-category") !== cat;
      });
    });
  });
})();
