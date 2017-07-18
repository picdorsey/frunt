let { mix } = require('laravel-mix');

// Globbing
mix.webpackConfig({module:{rules:[{enforce:'pre',test:/\.s[ac]ss$/,loader:'import-glob-loader'}]}});

// Configuration
mix.setPublicPath('public');
mix.autoload({
    jquery: ['window.jquery', 'window.jQuery', '$'],
    vue: 'Vue',
    axios: 'axios'
    lodash: '_',
});

// Mix
mix.js('src/js/app.js', 'public/js/bundle.js')
    .sass('src/scss/style.scss', 'public/css/style.css')
    .browserSync({
        host: 'localhost',
        port: 3000,
        files: ['app/**/*.php', 'resources/views/**/*.php', 'public/**/*.html', 'public/js/**/*.js', 'public/css/**/*.css'],
        server: {
            baseDir: 'public',
        },
        proxy: null,
    });
