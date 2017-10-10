// index.js
'use strict';

const mandelbrot = require('@frctl/mandelbrot');

/*
 * Configure the theme
 */
const subTheme = mandelbrot({
    skin: "fuchsia",
    styles: ['default', '/_subtheme/tweaks.css'] // link to the default stylesheet followed by a custom one
});

/*
 * Specify a template directory to override any view templates
 */
subTheme.addLoadPath(__dirname + '/views');

/*
 * Specify the static assets directory that contains the custom stylesheet.
 */
subTheme.addStatic(__dirname + '/assets', '/_subtheme');

/*
 * Export the customised theme instance so it can be used in Fractal projects
 */
module.exports = subTheme;