const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('browserify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');

function errLog(thrownBy, err) {
  gutil.log(gutil.colors.red(`Error :: ${thrownBy} : `), err.message);
}

function infoLog(info) {
  gutil.log(gutil.colors.blue('Info :: '), info);
}

gulp.task('sass', () =>
  gulp.src('./api/static/**/*.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./api/static/'))
);

gulp.task('bundle', () =>
  browserify('./api/static/js/main.js')
    .transform('babelify', {
      presets: ['es2015', 'react']
    })
    .bundle()
    .on('error', err => {
      errLog('Browserify', err);
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./api/static/js/'))
);

gulp.task('watch', () => {
  gulp.watch('./api/static/**/*.scss', ['sass']);
  gulp.watch(['./api/static/js/**/*.js', '!./api/static/js/index.js'], ['bundle']);
});
