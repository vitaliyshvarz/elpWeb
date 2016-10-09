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

/* JS & TS */
import jsuglify from 'gulp-uglify';
import typescript from 'gulp-typescript';

/* Images */
import imagemin from 'gulp-imagemin';

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', () => {
  return gulp.src(dev + 'scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(postcss([precss, autoprefixer, cssnano]))
      .pipe(sourcemaps.write())
      .pipe(ext_replace('.css'))
      .pipe(gulp.dest(prod + 'css/'));
});

gulp.task('build-ts', () => {
  return gulp.src(dev + '**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(tsProject))
      .pipe(sourcemaps.write())
      // .pipe(jsuglify())
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
  gulp.watch(dev + '**/*.ts', ['build-ts']);
  gulp.watch(dev + 'scss/**/*.scss', ['build-css']);
  gulp.watch(dev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css']);
