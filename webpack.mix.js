let mix = require('laravel-mix').mix;

mix.setPublicPath('public');
mix.setCachePath('.cache');

mix.sourceMaps();

mix.js('src/js/app.js', 'public/assets/js/bundle.js')
   .combine('src/js/vendor/*.js', 'public/assets/js/vendor.js')
   .sass('src/scss/style.scss', 'public/assets/css');
