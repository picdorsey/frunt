/*jslint node: true */
'use strict';

var gulp = require('gulp');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var beautify = require('gulp-beautify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var phpcs = require('gulp-phpcs');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var dist = './public/';

var path = {
    src: {
        sass: './src/sass/',
        js: './src/js/',
    },
    dist: {
        css: dist + 'assets/css/',
        js: dist + 'assets/js/'
    }
};

// Sass // --------------------------------------------------

gulp.task('styles', function () {
    return gulp.src(path.src.sass + '*.scss')
        .pipe(sass({
            errLogToConsole: true,
            sourceComments : 'normal'
        }))
        .pipe(plumber({ errorHandler: function (err) { console.log(err); } }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulpif(argv.beautify, beautify(), minifycss({processImport: false})))
        .pipe(gulp.dest(path.dist.css))
        .pipe(gulpif(argv.livereload, livereload(), reload({stream: true})))
        .pipe(notify({message: 'Styles Complete'}));
});

// Scripts // --------------------------------------------------

gulp.task('lint', function () {
    gulp.src([path.src.js + '*.js', path.src.js + 'modules/*.js', './gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    return browserify({ entries: [path.src.js + 'app.js']})
        .transform(babelify, { stage: 0 })
        .bundle()
        .on('error', function(e){
            console.log(e.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulpif(argv.beautify, streamify(beautify()), streamify(uglify())))
        .pipe(gulpif(argv.livereload, livereload(), reload({stream: true})))
        .pipe(gulp.dest(path.dist.js))
        .pipe(notify({message: 'Browserify Complete'}));
});

gulp.task('js', function() {
    return gulp.src(path.src.js + 'vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(plumber({ errorHandler: function (err) { console.log(err); } }))
        .pipe(gulpif(argv.beautify, beautify(), uglify()))
        .pipe(gulp.dest(path.dist.js))
        .pipe(gulpif(argv.livereload, livereload(), reload({stream: true})))
        .pipe(notify({message: 'JS Complete'}));
});

// HTML // --------------------------------------------------

gulp.task('html', function () {
    gulp.src(dist + '/**/*.html')
        .pipe(gulpif(argv.livereload, livereload(), reload({stream: true})));
});

// PHP // --------------------------------------------------

gulp.task('php', function () {
    gulp.src(['**/*.php', '!./vendor/**/*'])
       .pipe(gulpif(argv.livereload, livereload()));
});

gulp.task('php.format', function () {
    return gulp.src(['**/*.php', '!./vendor/**/*'])
        .pipe(plumber({ errorHandler: function (err) { console.log(err); } }))
        // Validate files using PHP Code Sniffer
        .pipe(phpcs({
            bin: 'phpcs',
            standard: 'PSR2',
            warningSeverity: 0
        }))
        // Log all problems that were found
        .pipe(phpcs.reporter('log'));
});

var format = function (path) {
    return gulp.src(path)
        .pipe(plumber({ errorHandler: function (err) { console.log(err); } }))
        // Validate files using PHP Code Sniffer
        .pipe(phpcs({
            bin: 'phpcs',
            standard: 'PSR2',
            warningSeverity: 0
        }))
        // Log all problems that were found
        .pipe(phpcs.reporter('log'));
};

// Server // --------------------------------------------------

gulp.task('browser-sync', function () {
    browserSync({
        notify: false,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        server: {
            baseDir: dist
        }
    });
});

// Task // --------------------------------------------------

gulp.task('watch', function () {
    watch(path.src.js + '**/*.js', function () {
        gulp.start(['lint', 'js', 'browserify']);
    });

    watch(path.src.sass + '**/*.scss', function () {
        gulp.start('styles');
    });

    watch(dist + '/**/*.html', function () {
        gulp.start('html');
    });

    watch(['**/*.php', '!./vendor/**/*'], function (event) {
        gulp.start(['php']);
        // PSR-2 Autoformat using https://github.com/squizlabs/PHP_CodeSniffer
        // format(event.path);
    });
});

gulp.task('dev', function () {
    gulp.start('watch');

    if (argv.livereload) {
        livereload.listen();
    } else {
        gulp.start('browser-sync');
    }
});

gulp.task('test', function () {
    gulp.start('lint');
});

gulp.task('default', function () {
    gulp.start('styles', 'browserify', 'js');
});
