import gulp from 'gulp';

const dev = 'src/';
const prod = 'dist/';

/* Mixed */
import ext_replace from 'gulp-ext-replace';

/* CSS */
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssnano from 'cssnano';
import clean from 'gulp-clean';

/* JS & TS */
import jsuglify from 'gulp-uglify';
import typescript from 'gulp-typescript';

/* Images */
import imagemin from 'gulp-imagemin';

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', (done) => {
  return gulp.src(dev + 'scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(postcss([precss, autoprefixer, cssnano]))
      .pipe(sourcemaps.write())
      .pipe(ext_replace('.css'))
      .pipe(gulp.dest(prod + 'css'));
});

gulp.task('build-ts', (done) => {
  return gulp.src(dev + 'js/**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(tsProject))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(prod + 'js'));
});

gulp.task('build-img', (done) => {
  return gulp.src(dev + 'img/**/*')
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(prod + 'img/'));
});

gulp.task('build-html', (done) => {
  return gulp.src(dev + '**/*.html')
    .pipe(gulp.dest(prod));
});

gulp.task('watch', () => {
  gulp.watch([dev + '**/*.ts',
              dev + 'scss/**/*.scss',
              dev + 'tpl/*',
              dev + 'img/*'], ['build-ts', 'build-css', 'build-html', 'build-img']);
});

gulp.task('clean', (done) => {
  return gulp.src('dist', {read: false})
      .pipe(clean());
});

gulp.task('default', ['clean', 'build-ts', 'build-css', 'build-html', 'build-img', 'watch']);
