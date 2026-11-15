module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().split("T")[0]);
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).toString());
  eleventyConfig.addFilter("unique", (arr) => [...new Set(arr)]);
  eleventyConfig.addFilter("map", (arr, key) => arr.map((item) => item[key]));
  eleventyConfig.addFilter("slug", (s) =>
    String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
