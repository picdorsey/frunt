# Frunt
[![Dependency Status](https://david-dm.org/picdorsey/frunt.svg)](https://david-dm.org/picdorsey/frunt)  [![devDependency Status](https://david-dm.org/picdorsey/frunt/dev-status.svg)](https://david-dm.org/picdorsey/frunt#info=devDependencies)

Scaffolds out a gulp.js boilerplate for front-end development using Frunt.

### Installation
* Make sure gulp is installed on your system `sudo npm install -g gulp`
* Then run `npm install` to install the dependencies.

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

(`gulp dev --livereload` to use livereload to watch for changes instead of browsersync.)

`gulp watch` to watch for changes (no server)

#### Options
`--livereload` to use livereload to watch for changes instead of browsersync.

`--beautify` do not minify any build files.
