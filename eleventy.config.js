import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

export default async function (eleventyConfig) {
    /**	******************** Layouts ******************** **/

    // Layout aliases
    eleventyConfig.addLayoutAlias("notfound", "layouts/404.html");
    eleventyConfig.addLayoutAlias("main", "layouts/main.html");
    eleventyConfig.addLayoutAlias("home", "layouts/pages/home.html");

    /**	******************** Dev Server ******************** **/

    // Configure dev server to show custom 404 page
    eleventyConfig.setServerOptions({
        showVersion: true,
        404: "/404.html",
    });

    /**	******************** Passthrough Copy ******************** **/
    eleventyConfig.addPassthroughCopy({ "_includes/css": "css" });
    eleventyConfig.addPassthroughCopy({ "_includes/images": "images" });

    // Root files
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPassthroughCopy("robots.txt");

    /**	******************** Plugins and Libraries ******************** **/

    // Markdown configuration
    const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);
    eleventyConfig.setLibrary("md", markdownLib);

    // Filter for rendering markdown from front matter
    eleventyConfig.addFilter("markdown", function (content) {
        if (!content) return "";
        return markdownLib.render(content);
    });
}

/** ******************** Config export ******************** **/

export const config = {
    dir: {
        input: "_content",
        includes: "../_includes",
        output: "docs",
    },
};
