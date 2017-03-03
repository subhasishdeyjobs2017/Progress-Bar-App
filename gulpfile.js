"use strict";

// Include gulp
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var paths = require('../paths');
var transpile = require('./transpile');

//******************************************
// BEGIN DEVELOPER BUILD
//******************************************

gulp.task('compress-dev-css', function() {
  return gulp.src(['!src/less/legacy/*.less', '!src/less/legacy-styles.less', '!src/less/teacher/*.less', '!src/less/teacher-sg-styles.less', '!src/less/modules/_iframe.less', 'src/less/**/*.less'])
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(cleancss())
      .pipe(gulp.dest('dist/styles'))
});

gulp.task('legacy-dev-css', function() {
  return gulp.src('src/less/legacy/*.less')
      .pipe(less())
      .pipe(concat('legacy.css'))
      .pipe(cleancss())
      .pipe(gulp.dest('dist/styles'))
});

gulp.task('teacher-sg-dev-css', function() {
  return gulp.src('src/less/teacher-sg-styles.less')
      .pipe(less())
      .pipe(concat('teacher-sg.css'))
      .pipe(cleancss())
      .pipe(gulp.dest('dist/styles'))
});

gulp.task('iframe-dev-css', function() {
  return gulp.src('src/less/modules/_iframe.less')
      .pipe(less())
      .pipe(concat('iframe.css'))
      .pipe(cleancss())
      .pipe(gulp.dest('dist/styles'))
});


//jshint for js validate

gulp.task('lint', function() {
  return gulp.src([paths.scripts])
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

gulp.task('inject-dev-js', function () {
  return gulp.src('index.html')
      .pipe(inject(gulp.src(paths.scripts)))
      .pipe(gulp.dest('.'))
});



// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.styles, ['compress-dev-css']);
  gulp.watch('src/less/legacy/*.less' , ['legacy-css']);
  gulp.watch('src/less/modules/_iframe.less' , ['iframe-dev-css']);
});


gulp.task('serve', [ 'compress-dev-css','legacy-dev-css','teacher-sg-dev-css','iframe-dev-css', 'transpile', 'inject-dev-js', 'lint', 'watch'], function() {
  runSequence('watch', 'compress-dev-css','legacy-dev-css','teacher-sg-dev-css','iframe-dev-css', 'transpile', 'inject-dev-js', 'lint');
});


//******************************************
// END DEVELOPER BUILD
//****************************************** 
