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
var vueify = require('vueify')
var plugins = require('gulp-load-plugins')();

//
// Assets Paths / Config
//

var dist = './public/';
var guideDist = './public/guide/';
var src = './src/';

var config = {
    production: !! plugins.util.env.production,
    src: {
        scss: src + 'scss/',
        js: src + 'js/'
    },
    dist: {
        css: dist + 'assets/css/',
        js: dist + 'assets/js/'
    },
    guideDist: {
        css: guideDist + 'assets/css/',
        js: guideDist + 'assets/js/'
    },
    sourcemaps: ! plugins.util.env.production,
    autoprefix:   true,
    babelOptions: {
        presets: ['es2015'],
        compact: false
    },
    autoprefixerOptions: {
        browsers: ['last 2 versions'],
        cascade: false
    }
};

//
// Styles
//

function compileScss(src, dist, cb) {
    gulp.src(src)
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
        .pipe(gulp.dest(dist))
        .pipe(plugins.if(argv.livereload, plugins.livereload(), reload({stream: true})))
        .pipe(cb());
}

gulp.task('styles', function () {
    compileScss([config.src.scss + 'style.scss', '!' + config.src.scss + 'guide.scss'], config.dist.css, function () {
        return plugins.notify({message: 'Site Styles Compiled!', onLast: true});
    });
});

//
// Guide Styles
//

gulp.task('guide', function (gulp) {
    compileScss(config.src.scss + 'guide.scss', config.guideDist.css, function () {
        return plugins.notify({message: 'Guide Styles Compiled!', onLast: true});
    });
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
        .transform(vueify)
        .bundle()
        .on('error', function(e){
            console.log(e.message);
            plugins.notify({message: 'Compilation Failed'})
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
        './public/guide/*', // Needs to be run before the dir can be removed.
        './public/guide',
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

gulp.task('watch', ['default'], function () {
    plugins.watch(config.src.js + '**/*', function () {
        gulp.start(['lint', 'js', 'browserify']);
    });

    plugins.watch(config.src.scss + '**/*.scss', function () {
        gulp.start('styles', 'guide');
    });

    plugins.watch(dist + '/**/*.html', function () {
        gulp.start('html');
    });
});

gulp.task('dev', ['default'], function () {
    gulp.start('watch');

    if (argv.livereload) {
        plugins.livereload.listen();
    } else {
        gulp.start('browser-sync');
    }
});

gulp.task('default', function () {
    gulp.start('styles', 'guide', 'browserify', 'js');
});
