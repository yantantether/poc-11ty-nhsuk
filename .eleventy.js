let Nunjucks = require("nunjucks");
let pluginSass = require("eleventy-plugin-sass");
let markdownIt = require('markdown-it')
let markdownItClass = require('@toycode/markdown-it-class')
let classMapping = require('./class-mapping.json'); //(with path)

module.exports = function(eleventyConfig) {
    
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['node_modules/nhsuk-frontend/packages/*.{scss,sass}'],
  });

  const md = markdownIt().use(markdownItClass, classMapping)
  eleventyConfig.setLibrary("md", md);

  var nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(["views/_includes", "node_modules/nhsuk-frontend/packages/components"])
  )
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  eleventyConfig.addPassthroughCopy(
    {"node_modules/nhsuk-frontend/packages/assets": "/"});

  return {
    dir: {
      input: "views",
    },
    markdownTemplateEngine: "njk",
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: "njk"
  };
};

