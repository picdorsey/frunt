# Frunt
[![Dependency Status](https://david-dm.org/picdorsey/frunt.svg)](https://david-dm.org/picdorsey/frunt)  [![devDependency Status](https://david-dm.org/picdorsey/frunt/dev-status.svg)](https://david-dm.org/picdorsey/frunt#info=devDependencies)

Scaffolds out a gulp.js boilerplate for front-end development using Frunt.

### Installation
* Make sure gulp is installed on your system `sudo npm install -g gulp`
* Then run `npm run build` to install the dependencies and to run gulp.

### Features

* Development Environment
   * browser-sync
   * gulp-livereload
   * gulp-watch
* Javascript Tools
    * [Browserify](http://browserify.org/)
    * ES6 Support
    * gulp-jshint
    * gulp-concat
    * gulp-uglify
* Sass Tools
    * [Frunt](http://frunt.io)
    * gulp-autoprefixer
    * gulp-minify-css

## Documentation

### Gulp
`gulp` to build all the files.

`gulp dev` to watch BrowserSync and to watch for changes.

`gulp watch` to watch for changes (no server)

#### Options
`--livereload` to use livereload to watch for changes instead of browsersync.

`--production` for production ready code (minify, no source maps)

#### Config
Make the `config.production` variable `true` to always minify the files.

## Readings
http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm
