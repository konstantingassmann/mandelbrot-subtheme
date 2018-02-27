// index.js
'use strict';

const mandelbrot = require('@frctl/mandelbrot');

/*
 * Configure the theme
 */
const subTheme = mandelbrot({
    skin: 'yellow',
    styles: ['default', '/_subtheme/tweaks.css'],
    scripts: ['default', '/_subtheme/js/header.js'],
    panels: ["html", "view", "context", "resources", "info", "notes"]
});

subTheme.addRoute('/components/embed/:handle', {
    handle: 'embed',
    view: 'pages/components/embed.nunj'
}, getHandles);

// copied from of @frctl/mandelbrot/src/theme.js wont't work when used from base theme
let handles = null;

function getHandles(app) {
    app.components.on('updated', () => (handles = null));
    if (handles) {
        return handles;
    }
    handles = [];
    app.components.flatten().each(comp => {
        handles.push(comp.handle);
        if (comp.variants().size > 1) {
            comp.variants().each(variant => handles.push(variant.handle));
        }
    });
    handles = handles.map(h => ({handle: h}));
    return handles;
}

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