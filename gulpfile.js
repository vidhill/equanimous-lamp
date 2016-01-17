'use strict';

var gulp = require('gulp'),
    npmPackage = require('./package.json'),
    mzrConfig = require('./config-files/modernizr-config.json'),
    partialLintOpts = require('./config-files/htmlhint-config.json'),
    runSequence = require('run-sequence')
  ;

var htmlVars = {
  staticsUrl: '//libs.vidhill.com',
  jsSuffix: 'min.js',
  releaseVers: npmPackage.version
};

var plugins = {

  del: require('del'),
  debug: require('gulp-debug'),
  rename: require("gulp-rename"),

  // css plugins
  sass: require('gulp-sass'),
  autoprefixer: require('gulp-autoprefixer'),
  cssmin: require('gulp-cssmin'),

  sourcemaps: require('gulp-sourcemaps'),

  // html plugins
  htmlhint: require('gulp-htmlhint'),
  template: require('gulp-template'),
  inject: require('gulp-inject'),

  // javascript plugins
  eslint: require('gulp-eslint'),
  concat: require('gulp-concat'),
  uglify: require('gulp-uglify'),

  modernizr: require("modernizr"),

  gutil: require('gulp-util'), // gulp utilities
  extend: require('util')._extend,
 
  Stream: require('stream')

};

gulp.task('scripts', ['clean:js'], require('./gulp-tasks/scripts')( gulp, plugins ));
gulp.task('sass', ['clean:scss'], require('./gulp-tasks/sass')( gulp, plugins ));

gulp.task('modernizr', require('./gulp-tasks/build-modernizr')( gulp, plugins, mzrConfig ));


gulp.task('clean', function(cb) {
  console.log('Deleting Dest');
  return plugins.del(['dest/*'], cb);
});

gulp.task('clean:scss', function(cb) {
  return plugins.del(['dest/css'], cb);
})

gulp.task('clean:js', function(cb) {
  return plugins.del(['dest/js'], cb);
})


gulp.task('copy', function (){
	gulp.src(['src/*', '!src/index.html', '!src/*.css'])
		.pipe(gulp.dest('dest'));

  gulp.src('angular-modules/**/*.html')
    .pipe(gulp.dest('dest/angular-modules'));
});

gulp.task('html', require('./gulp-tasks/html')( gulp, plugins, partialLintOpts, htmlVars));
 
gulp.task('watch', function () {
  gulp.watch('angular-modules/**/*.js', ['scripts']);
  gulp.watch('angular-modules/**/*.html', ['html']);
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('build', function(cb){
    runSequence('clean', [ 'copy', 'sass', 'scripts', 'html' ], cb);
});

