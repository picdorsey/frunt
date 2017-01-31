let mix = require('laravel-mix');

mix.setPublicPath('public');

mix.js('src/js/app.js', 'public/assets/js/bundle.js')
   .combine([], 'public/assets/js/vendor.js')
   .sass('src/scss/style.scss', 'public/assets/css')
   .sass('src/scss/guide.scss', 'public/guide/assets/css');
