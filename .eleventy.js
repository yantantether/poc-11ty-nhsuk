let Nunjucks = require("nunjucks");
let pluginSass = require("eleventy-plugin-sass");

module.exports = function(eleventyConfig) {
    
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['node_modules/nhsuk-frontend/packages/*.{scss,sass}'],
  });

  eleventyConfig.setLibrary("njk", new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(["node_modules/nhsuk-frontend/packages/components"])
  ));

  eleventyConfig.addPassthroughCopy(
    {"node_modules/nhsuk-frontend/packages/assets": "/"});

  return {
    dir: {
      input: "views",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

