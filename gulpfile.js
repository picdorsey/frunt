const flixir = require('flixir');

flixir((mix) => {

    // Styles
    mix.sass('style.scss');
    mix.sass('guide.scss', 'public/guide/assets/css');

    // Scripts
    mix.webpack('app.js', flixir.config.publicPath + '/js/bundle.js');
    mix.scriptsIn('src/js/vendor/', flixir.config.publicPath + '/js/vendor.js');

    // BrowserSync (gulp watch only)
    mix.browserSync({
        files: [
            './public/assets/css/*.css',
            './public/assets/js/*.js',
            './public/**/*.html',
        ]
    });

});
