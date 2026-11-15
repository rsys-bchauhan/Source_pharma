const fs = require("fs");
const path = require("path");

// Labels can use {shortName} / {name}, which are filled in from site.json.
module.exports = function () {
  const site = JSON.parse(fs.readFileSync(path.join(__dirname, "site.json"), "utf8"));
  const items = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about/" },
    { label: "Products", url: "/products/" },
    { label: "Quality", url: "/quality/" },
    { label: "Why {shortName}", url: "/why-us/" },
    { label: "Contact", url: "/contact/" },
  ];
  return items.map((i) => ({
    ...i,
    label: i.label.replace("{shortName}", site.shortName).replace("{name}", site.name),
  }));
};
