const { mix } = require('laravel-mix');

mix.js('src/js/app.js', 'public/js/bundle.js')
   .sass('src/scss/style.scss', 'public/css/style.css')
   // .sass('src/scss/guide.scss', 'public/guide/assets/css')
   .browserSync();
