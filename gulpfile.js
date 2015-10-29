'use strict';
 
var gulp = require('gulp'),
	del = require('del'),
  debug = require('gulp-debug'),

	sass = require('gulp-sass'),

	sourcemaps = require('gulp-sourcemaps'),

  jslint = require('gulp-jslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
	;




gulp.task('delete', function() {
  console.log('Deleting Dest');
  return del(['dest/*']);
})


gulp.task('copy', ['delete'], function (){
	gulp.src('src/*')
		.pipe(gulp.dest('dest'));

  gulp.src('angular-modules/**/*')
    .pipe(gulp.dest('dest/angular-modules'));
});

gulp.task('scripts', function () {
    gulp.src('angular-modules/**/*.js')
      .pipe(jslint({
          curly: true,
          node: true,
          predef: ['angular']
      }))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dest/js'))
      ;
});

gulp.task('sass', ['delete'], function () {
  gulp.src('scss/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(debug({title: 'unicorn:'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dest/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('build', ['delete'], function(){
    console.log('cleaning done, go');
});



gulp.task('default', [ 'copy', 'sass', 'scripts' ]);