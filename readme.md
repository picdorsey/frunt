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
    * gulp-autoprefixer
    * gulp-minify-css
    * Bootstrap V4 (Alpha)

## Documentation

### Gulp
`gulp` to build all the files.

`gulp dev` to watch BrowserSync and to watch for changes.

`gulp watch` to watch for changes (no server).

`gulp clean` to remove build and guide files.

#### Options
`--livereload` to use livereload to watch for changes instead of browsersync.

`--production` for production ready code (minify, no source maps)

#### Config
Make the `config.production` variable `true` to always minify the files.

### SCSS (Quick Reference)

#### Flexbox

Open the `_config.scss` file and find the `$enable-flex variable`.
Change it from `false` to `true`.
Recompile, and done!


**Why flexbox?**


In a nutshell, flexbox provides simpler and more flexible layout options in CSS. More specifically, it provides:

* Easy vertical alignment of content within a parent element.
* Easy reordering of content across devices and screen resolutions with the help of media queries.
* Easy CSS-only equal height columns for your grid-based layouts.

All these things are possible outside flexbox, but typically require extra hacks and workarounds to do right.

#### Grid

```html
<div class="container">
    <div class="row">
        <div class="col-sm-4">
             One of three columns
        </div>
        <div class="col-sm-4">
            One of three columns
        </div>
        <div class="col-sm-4">
            One of three columns
        </div>
    </div>
</div>
```

**Sizes**

* **xs** < 0  (Extra small screen / phone)
* **sm** > 544px (Small screen / phone)
* **md** > 768px (Medium screen / tablet)
* **lg** > 992px (Large screen / desktop)
* **xl** > 1200px (Extra large screen / wide desktop)

**Mixins**

```scss
// Creates a wrapper for a series of columns
@mixin make-row($gutter: $grid-gutter-width) {
    margin-left:  ($gutter / -2);
    margin-right: ($gutter / -2);
    @include clearfix();
}

// Make the element grid-ready (applying everything but the width)
@mixin make-col($gutter: $grid-gutter-width) {
    position: relative;
    float: left;
    min-height: 1px;
    padding-left:  ($gutter / 2);
    padding-right: ($gutter / 2);
}

// Set a width (to be used in or out of media queries)
@mixin make-col-span($columns) {
  width: percentage(($columns / $grid-columns));
}

// Get fancy by offsetting, or changing the sort order
@mixin make-col-offset($columns) {
  margin-left: percentage(($columns / $grid-columns));
}
@mixin make-col-push($columns) {
  left: percentage(($columns / $grid-columns));
}
@mixin make-col-pull($columns) {
  right: percentage(($columns / $grid-columns));
}
```

Example

```scss
.container {
    max-width: 60em;
    @include make-container();
}
.row {
    @include make-row();
}
.content-main {
    @include make-col();

    @media (max-width: 32em) {
        @include make-col-span(6);
    }
    @media (min-width: 32.1em) {
      @include make-col-span(8);
    }
}
.content-secondary {
    @include make-col();

    @media (max-width: 32em) {
      @include make-col-span(6);
    }
    @media (min-width: 32.1em) {
      @include make-col-span(4);
    }
}
```

#### Media Queries

Scale Up (min-width)

```scss
@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }

// Example usage:
@include media-breakpoint-up(sm) {
    .some-class {
        display: block;
    }
}
```

Scale Down (max-width)

```scss
@include media-breakpoint-down(xs) { ... }
@include media-breakpoint-down(sm) { ... }
@include media-breakpoint-down(md) { ... }
@include media-breakpoint-down(lg) { ... }
```

#### Components
```scss
@include component(Foo) {

    @include option(bar) { ... } // Foo --bar
    
    @include part(baz) { ... } // Foo__baz

}

```

### How do parts react to component states like hover?
In Sass you can append a `&` to a selector or pseudo-selector to have it applied to the parent context. So for example to have a `part` react when the `component` gets hovered:

```scss
@include component(capacitor){
    background: red;
  
    @include part(flux){
      background: orange;
    }
  
    &:hover & {
      @include part(flux){
        background: blue;
      }
    }
}
```

## Readings
http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm
