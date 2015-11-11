'use strict';

var gulp = require('gulp'),
    mzrConfig = require('./config-files/modernizr-config.json'),
    partialLintOpts = require('./config-files/htmlhint-config.json')
  ;

 
var plugins = {

  del: require('del'),
  debug: require('gulp-debug'),
  rename: require("gulp-rename"),

  sass: require('gulp-sass'),
  autoprefixer: require('gulp-autoprefixer'),

  sourcemaps: require('gulp-sourcemaps'),

  // html plugins
  htmlhint: require('gulp-htmlhint'),
  templateCache: require('gulp-angular-templatecache'),

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


gulp.task('clean', function() {
  console.log('Deleting Dest');
  return plugins.del(['dest/*']);
});

gulp.task('clean:scss', function() {
  console.log('Deleting CSS');
  return plugins.del(['dest/css']);
})

gulp.task('clean:js', function() {
  console.log('Deleting JS');
  return plugins.del(['dest/js']);
})


gulp.task('copy', function (){
	gulp.src('src/*')
		.pipe(gulp.dest('dest'));

  gulp.src('angular-modules/**/*')
    .pipe(gulp.dest('dest/angular-modules'));
});


var htmlTasks = require('./gulp-tasks/html')( gulp, plugins, partialLintOpts);

gulp.task('html:template', htmlTasks.template );
gulp.task('html:page', htmlTasks.page );

 
gulp.task('watch', function () {
  gulp.watch('angular-modules/**/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('build', ['clean'], function(){
    console.log('cleaning done, go');
});


gulp.task('default', [ 'copy', 'sass', 'scripts', 'html:template' ]);


