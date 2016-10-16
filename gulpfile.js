var gulp = require('gulp');

var dev = 'src/app/';
var prod = 'dist/app/';

var thirdSassPaths = [
  'node_modules/foundation/scss/**/*.scss',
  'node_modules/motion-ui/dist/**/*.css'
];
/* Mixed */
var ext_replace = require('gulp-ext-replace');
// import concat from 'gulp-concat';
var runSequence = require('run-sequence');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');
var clean = require('gulp-clean');
var sass = require('gulp-sass');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json',
{ experimentalDecorators: true });

gulp.task('build-third-css', function () {
  return gulp.src(thirdSassPaths)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(prod + 'css/third'));
});

gulp.task('build-css', function () {
  return gulp.src(dev + '**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(postcss([precss, autoprefixer, cssnano]))
      .pipe(sourcemaps.write())
      .pipe(ext_replace('.css'));
});

gulp.task('build-ts', function () {
  return gulp.src([dev + '**/*.ts', 'typings/tsd.d.ts'])
      .pipe(sourcemaps.init())
      .pipe(typescript(tsProject))
      .pipe(sourcemaps.write())
      .pipe(jsuglify())
      .pipe(gulp.dest(prod));
});

gulp.task('build-img', function () {
  return gulp.src(dev + 'img/**/*')
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(prod + 'img/'));
});

gulp.task('build-html', function () {
  return gulp.src(dev + '**/*.html')
    .pipe(gulp.dest(prod));
});

gulp.task('watch', function () {
  gulp.watch([dev + '**/*.ts',
              dev + '**/*.scss',
              dev + '**/*.html',
              dev + 'img/*'], ['develop']);
});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
      .pipe(clean());
});

gulp.task('start', (done) => {
  runSequence('develop', 'build-third-css', function () {
    done();
  });
});

gulp.task('develop', (done) => {
  runSequence(
  'clean',
  'build-ts',
  'build-css',
  'build-html',
  'build-img', () => done());
});

gulp.task('default', [
  'start'
]);
