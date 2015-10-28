const gulp     = require('gulp');
const tsc      = require('gulp-tsc');
const server   = require('gulp-server-livereload');
const jade     = require('gulp-jade');
const stylus   = require('gulp-stylus');
const tslint   = require('gulp-tslint');
const clean    = require('gulp-clean');  
const concat   = require('gulp-concat');
const ngmin    = require('gulp-ngmin');
const uglify    = require('gulp-uglify');
const sourcemaps    = require('gulp-sourcemaps');
const rename    = require('gulp-rename');


var path = {
  src:'./src/**/',
  dist: './dist/'
}

gulp.task('webserver', function() {
  gulp.src(path.dist)
    .pipe(server({
      livereload: true
    }));
});

gulp.task('clean', function () {
  return gulp.src(path.dist + 'js/', {read: false})
    .pipe(clean());
});

//'json' prints stringified JSON to console.log.
//'prose' prints short human-readable failures to console.log.
//'verbose' prints longer human-readable failures to console.log.
//'full' is like verbose, but displays full path to the file


gulp.task('vendor', function() {  
  return gulp.src('bower_components/**/*.min.js')
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(path.dist + 'vendor'));
});

gulp.task('tslint', function(){
  return gulp.src(path.src + '*.ts')
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});

gulp.task('compile', function(){
  gulp.src(path.src + '*.ts')
    .pipe(tsc())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(rename('main.min.js'))
    .pipe(sourcemaps.init())
      .pipe(ngmin())
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist + 'js/'));
});

gulp.task('templates', function() {
 
  gulp.src(path.src + '*.jade')
    .pipe(jade())
    .pipe(gulp.dest(path.dist))
});


gulp.task('stylus', function () {
  gulp.src(path.src + '*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(path.dist));
});


gulp.task('default', function() {  
  gulp.run(['tslint', 'compile', 'templates', 'stylus', 'webserver']);

  gulp.watch(path.src + '*.ts', ['tslint', 'compile']);
  gulp.watch(path.src + '*.jade', ['templates']);
  gulp.watch(path.src + '*.styl', ['stylus']);
});