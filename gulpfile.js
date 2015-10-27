'use strict';
 
var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps')
	;


gulp.task('delete', function() {
  del(['dest/*'], function (err) {
    console.log('Files deleted');
  });
})


gulp.task('copy', function (){
	gulp.src('src/*')
		.pipe(gulp.dest('dest'));
});


gulp.task('sass', function () {
  gulp.src('scss/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dest/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', [ 'delete', 'copy', 'sass' ]);