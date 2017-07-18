# Frunt
A modern responsive framework for rapid front-end development.

### Installation

* Make sure you have webpack installed `npm install -g webpack`
* Run `npm install` to install the dependencies.

### Compilation

Frunt is build using webpack powered by [Laravel Mix](https://github.com/JeffreyWay/laravel-mix).

Go ahead and compile these down.

`yarn run dev` : Run webpack

`yarn run watch` : Run webpack and browsersync

`yarn run production` :  Run wepback in production mode (minification)


Once that finishes, you should now see:

* `./public/js/app.js`
* `./public/css/app.css`

Excellent! Next, let's get to work. To watch your JavaScript for changes, run:

```bash
yarn run watch
```



## Documentation

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
    @include make-container();
}
.row {
    @include make-row();
}
.content-main {
    @include make-col();

    @include media-breakpoint-up(md) {
        @include make-col-span(6);
    }

    @include media-breakpoint-up(lg) {
        @include make-col-span(8);
    }
}
.content-secondary {
    @include make-col();

    @include media-breakpoint-up(md) {
        @include make-col-span(6);
    }

    @include media-breakpoint-up(lg) {
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

#### BEM
http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

```scss
/**
 * The top-level ‘Block’ of a component.
 */
.modal {}

  /**
   * An ‘Element’ that is a part of the larger Block.
   */
    .modal__title {}

/**
 * A ‘Modifier’ of the Block.
 */
.modal--large {}
```


#### Namespaces
http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/


