// requires version 2.0 of Browsersync or higher.
var browserSync  = require("browser-sync").create();
var htmlInjector = require("bs-html-injector");

// register the plugin
browserSync.use(htmlInjector, {
    // Files to watch that will trigger the injection
    files: "./**/*.html"
});

// now run Browsersync, watching CSS files as normal
browserSync.init({
    files: "./**/*.css",
    serveStatic: ['.']
});