import gulp from 'gulp';

const dev = 'src/app/';
const prod = 'dist/app/';

const thirdSassPaths = [
  'node_modules/foundation/scss/**/*.scss',
  'node_modules/motion-ui/dist/**/*.css'
];
/* Mixed */
import ext_replace from 'gulp-ext-replace';
// import concat from 'gulp-concat';
import runSequence from 'run-sequence';

/* CSS */
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssnano from 'cssnano';
import clean from 'gulp-clean';
import sass from 'gulp-sass';

/* JS & TS */
// import jsuglify from 'gulp-uglify';
import typescript from 'gulp-typescript';

/* Images */
import imagemin from 'gulp-imagemin';

const tsProject = typescript.createProject('tsconfig.json',
{ experimentalDecorators: true });

gulp.task('build-third-css', () => {
  return gulp.src(thirdSassPaths)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(prod + 'css/third'));
});

gulp.task('build-css', () => {
  return gulp.src(dev + '**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(postcss([precss, autoprefixer, cssnano]))
      .pipe(sourcemaps.write())
      .pipe(ext_replace('.css'));
});

gulp.task('build-ts', () => {
  return gulp.src([dev + '**/*.ts', 'typings/tsd.d.ts'])
      .pipe(sourcemaps.init())
      .pipe(typescript(tsProject))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(prod));
});

gulp.task('build-img', () => {
  return gulp.src(dev + 'img/**/*')
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(prod + 'img/'));
});

gulp.task('build-html', () => {
  return gulp.src(dev + '**/*.html')
    .pipe(gulp.dest(prod));
});

gulp.task('watch', () => {
  gulp.watch([dev + '**/*.ts',
              dev + '**/*.scss',
              dev + '**/*.html',
              dev + 'img/*'], ['develop']);
});

gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
      .pipe(clean());
});

gulp.task('start', (done) => {
  runSequence('develop', 'build-third-css', () => done());
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
