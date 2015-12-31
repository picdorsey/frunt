/**
 * Gulp Build Script
 * -----------------------------------------------------------------------------
 * @category   Node.js Build File
 * @package    Frunt
 * @copyright  Copyright (c) 2015 Piccirilli Dorsey
 * @license    https://opensource.org/licenses/MIT The MIT License (MIT)
 * @version    1.0
 * @link       https://github.com/picdorsey/frunt
 */

var flixir = require('flixir');

flixir(function (mix) {

    // Styles
    mix.sass('style.scss');
    mix.sass('guide.scss', 'public/guide/assets/css');

    // Scripts
    mix.browserify('app.js');
    mix.scriptsIn('src/js/vendor/', flixir.config.publicPath + '/js/vendor.js');

    // Browsersync (gulp watch only)
    mix.browserSync({
        files: [
            './public/assets/css/*.css',
            './public/assets/js/*.js',
            './public/**/*.html',
        ]
    });

});

