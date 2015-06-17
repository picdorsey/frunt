# Frunt
[![Dependency Status](https://david-dm.org/picdorsey/frunt.svg)](https://david-dm.org/picdorsey/frunt-web-app)  [![devDependency Status](https://david-dm.org/picdorsey/frunt/dev-status.svg)](https://david-dm.org/picdorsey/frunt-web-app#info=devDependencies)

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

#### Options
`--livereload` to use livereload to watch for changes instead of browsersync. (Useful for PHP/Vagrant).

`--beautify` do not minify build files.

### Sass

### Javascript

Using [Browserify](http://browserify.org/)

`/src/js/app.js` builds to `/public/assets/js/app.js` 

Anything inside the `/src/js/external` directory builds to `/public/assets/js/external.js` 

***Notes***
It is recommended to download external javascript files using NPM if available. If you need to add a third party javascript, add the file to the `/src/js/external` folder.
