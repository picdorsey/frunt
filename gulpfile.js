/**
 * Gulp Build Script
 * -----------------------------------------------------------------------------
 * @category   Node.js Build File
 * @package    Frunt
 * @copyright  Copyright (c) 2015 Piccirilli Dorsey
 * @license    https://opensource.org/licenses/MIT The MIT License (MIT)
 * @version    1.0
 * @link       https://github.com/picdorsey/frunt
 */

//
// Modules
//

var gulp = require('gulp');
var argv = require('yargs').argv;
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var stringify = require('stringify');
var plugins = require('gulp-load-plugins')();

//
// Assets Paths / Config
//

var dist = './public/';
var src = './src/';

var config = {
    production: !! plugins.util.env.production,
    src: {
        scss: src + 'sass/',
        js: src + 'js/'
    },
    dist: {
        css: dist + 'assets/css/',
        js: dist + 'assets/js/'
    },
    sourcemaps: ! plugins.util.env.production,
    autoprefix:   true,
    babelOptions: {
          stage: 2,
          compact: false
    },
    autoprefixerOptions: {
        browsers: ['last 2 versions'],
        cascade: false
    }
};

//
// Sass
//

gulp.task('styles', function () {
    gulp.src(config.src.scss + '*.scss')
        .pipe(plugins.plumber({ errorHandler: function (err) {console.log(err);}}))
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
        .pipe(plugins.cssGlobbing({
            extensions: ['.scss']
        }))
        .pipe(plugins.sass({
            outputStyle: 'expanded',
            errLogToConsole: true,
            sourceComments: false
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer(config.autoprefixerOptions))
        .pipe(plugins.if(config.production, plugins.minifyCss({processImport: false})))
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(config.dist.css))
        .pipe(plugins.if(argv.livereload, plugins.livereload(), reload({stream: true})))
        .pipe(plugins.notify({message: 'Stylesheets Compiled!', onLast: true}));
});

//
// Javascript
//

gulp.task('lint', function () {
    gulp.src([config.src.js + '**/*.js', '!' +  config.src.js + 'vendor/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

gulp.task('browserify', function () {
    return browserify({ entries: [config.src.js + 'app.js']})
        .transform(babelify, config.babelOptions)
        .transform(stringify(['.html']))
        .bundle()
        .on('error', function(e){
            console.log(e.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
        .pipe(plugins.if(config.production, plugins.uglify()))
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('./')))
        .pipe(plugins.if(argv.livereload, plugins.livereload(), reload({stream: true})))
        .pipe(gulp.dest(config.dist.js))
        .pipe(plugins.notify({message: 'Scripts Compiled!', onLast: true}));
});

gulp.task('js', function() {
    return gulp.src(config.src.js + 'vendor/*.js')
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.plumber({ errorHandler: function (err) { console.log(err); } }))
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
        .pipe(plugins.if(config.production, plugins.uglify()))
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('./')))
        .pipe(gulp.dest(config.dist.js))
        .pipe(plugins.if(argv.livereload, plugins.livereload(), reload({stream: true})))
        .pipe(plugins.notify({message: 'Vendor Scripts Compiled!', onLast: true}));
});

//
// HTML
//

gulp.task('html', function () {
    gulp.src(dist + '/**/*.html')
        .pipe(plugins.if(argv.livereload, plugins.livereload(), reload({stream: true})));
});

//
// Clean
//

gulp.task('clean', function() {
    del([
        // Build Files
        './public/assets/css/*.css',
        './public/assets/css/*.map',
        './public/assets/js/*.js',
        './public/assets/js/*.map',
        // Guide
        './public/guide.html',
        './src/sass/guide.scss',
        './src/js/vendor/jquery.sticky.js',
    ]);
});

//
// Browser Sync
//

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

//
// Gulp Tasks
//

gulp.task('watch', function () {
    plugins.watch(config.src.js + '**/*', function () {
        gulp.start(['lint', 'js', 'browserify']);
    });

    plugins.watch(config.src.scss + '**/*.scss', function () {
        gulp.start('styles');
    });

    plugins.watch(dist + '/**/*.html', function () {
        gulp.start('html');
    });
});

gulp.task('dev', function () {
    gulp.start('watch');

    if (argv.livereload) {
        plugins.livereload.listen();
    } else {
        gulp.start('browser-sync');
    }
});

gulp.task('default', function () {
    gulp.start('styles', 'browserify', 'js');
});
