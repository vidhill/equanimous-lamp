'use strict';

var gulp = require('gulp'),
    npmPackage = require('./package.json'),
    mzrConfig = require('./build-config-files/modernizr-config.json'),
    partialLintOpts = require('./build-config-files/htmlhint-config.json'),
    runSequence = require('run-sequence')
  ;

var htmlVars = {
  staticsUrl: '//libs.vidhill.com',
  jsSuffix: 'min.js',
  releaseVers: npmPackage.version,
  year: new Date().getFullYear()
};

var plugins = {

  del: require('del'),
  debug: require('gulp-debug'),
  rename: require("gulp-rename"),
  fs: require('fs'),

  // css plugins
  sass: require('gulp-sass'),
  autoprefixer: require('gulp-autoprefixer'),
  cssmin: require('gulp-cssmin'),

  sourcemaps: require('gulp-sourcemaps'),

  // html plugins
  htmlhint: require('gulp-htmlhint'),
  htmlMin: require('gulp-htmlmin'),
  lodashTemplate: require('gulp-template'),
  inject: require('gulp-inject'),

  // javascript plugins
  eslint: require('gulp-eslint'),
  concat: require('gulp-concat'),
  uglify: require('gulp-uglify'),
  header: require('gulp-header'),

  //images etc
  favicons: require("gulp-favicons"),

  modernizr: require("modernizr"),

  gutil: require('gulp-util'), // gulp utilities
  extend: require('util')._extend,

  Stream: require('stream')

};

gulp.task('scripts', ['clean:js'], require('./gulp-tasks/scripts')( gulp, plugins, npmPackage ));
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
  // things to copy directly from src into dest
  gulp.src(['app.js', 'robots.txt', 'humans.txt', 'manifest.json'], { cwd: 'src' })
		.pipe(gulp.dest('dest'));

  gulp.src('angular-modules/**/*.html')
    .pipe(plugins.htmlhint(partialLintOpts))
    .pipe(plugins.htmlhint.reporter())
    // .pipe(plugins.htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dest/angular-modules'));

  // copy modernizr into dest
  gulp.src('third-party-libs/modernizr/*.js')
    .pipe(gulp.dest('dest/modernizr'));

});

gulp.task('favicons', require('./gulp-tasks/favicons')( gulp, plugins, npmPackage ));

gulp.task('html', require('./gulp-tasks/html')( gulp, plugins, partialLintOpts, htmlVars));

gulp.task('watch', function () {
  gulp.watch(['angular-modules/**/*.js', 'src/app.js'], ['scripts', 'copy']);
  gulp.watch(['angular-modules/**/*.html', 'src/index.html'], ['html']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('build', function(cb){
    runSequence('clean', [ 'copy', 'sass', 'scripts', 'html', 'favicons' ], cb);
});
