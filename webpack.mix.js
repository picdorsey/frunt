const { mix } = require('laravel-mix');

mix.setPublicPath('public');

// Globbing
mix.webpackConfig({
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.s[ac]ss$/,
                loader: 'import-glob-loader'
            }
        ]
    }
});

const browserSync = {
    host: 'localhost',
    port: 3000,
    files: [
        'app/**/*.php',
        'resources/views/**/*.php',
        'public/**/*.html',
        'public/js/**/*.js',
        'public/css/**/*.css'
    ],
    server: {
        baseDir: 'public',
    },
    proxy: null,
};

mix.js('src/js/app.js', 'public/js/bundle.js')
    .sass('src/scss/style.scss', 'public/css/style.css')
    .browserSync(browserSync);
