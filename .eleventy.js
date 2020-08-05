const Nunjucks = require("nunjucks");
const pluginSass = require("eleventy-plugin-sass");
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')
const classMapping = require('./class-mapping.json'); //(with path)
const yaml = require("js-yaml");


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

  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

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

