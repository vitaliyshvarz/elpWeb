/// <binding ProjectOpened='default' />
var gulp = require('gulp');
var concat = require('gulp-concat');

var dev = 'src/app/';
var prod = 'dist/app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');
var runSequence = require('run-sequence');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');
var clean = require('gulp-clean');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json', {
    experimentalDecorators: true
});

gulp.task('build-third-js', function () {
    return gulp.src(['node_modules/foundation-sites/dist/**/*.js'])
        .pipe(concat('third.js'))
        .pipe(gulp.dest(prod + 'assets/js'));
});

gulp.task('build-css', function () {
    return gulp.src(dev + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(prod));
});

gulp.task('build-ts', function () {
    return gulp.src([dev + '**/*.ts', 'typings/tsd.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(jsuglify())
        .pipe(sourcemaps.write('../../' + prod))
        .pipe(gulp.dest(prod));
});

gulp.task('copy-vid', function () {
    return gulp.src([dev + '**/*.mp4', dev + '**/*.webm'])
        .pipe(gulp.dest(prod));
});

gulp.task('build-img', function () {
    return gulp.src([dev + '**/*.jpg', dev + '**/*.png'])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(prod));
});

gulp.task('build-html', function () {
    return gulp.src(dev + '**/*.html')
        .pipe(gulp.dest(prod));
});

gulp.task('watch', function () {
    gulp.watch([dev + '**/*.ts',
        dev + '**/*.scss',
        dev + '**/*.html',
        dev + '**/*.png',
        dev + '**/*.jpg'
    ], [
        'build-ts',
        'build-css',
        'build-html',
        'build-img'
    ]);
});

gulp.task('clean', function () {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('start', function () {
    runSequence('develop',
        'build-third-js',
        'copy-vid',
        'watch');
});


gulp.task('develop', function (done) {
    runSequence(
        'clean',
        'build-ts',
        'build-css',
        'build-html',
        'build-img',
        function () {
            done();
        });
});

gulp.task('default', [
    'start'
]);
