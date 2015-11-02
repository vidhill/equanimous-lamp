'use strict';
 
var gulp = require('gulp'),
	del = require('del'),
  debug = require('gulp-debug'),

	sass = require('gulp-sass'),

	sourcemaps = require('gulp-sourcemaps'),

  // html plugins
  htmlhint = require('gulp-htmlhint'),

  // javascript plugins
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
	;


gulp.task('clean', function() {
  console.log('Deleting Dest');
  return del(['dest/*']);
})

gulp.task('copy', ['clean'], function (){
	gulp.src('src/*')
		.pipe(gulp.dest('dest'));

  gulp.src('angular-modules/**/*')
    .pipe(gulp.dest('dest/angular-modules'));
});

gulp.task('scripts', function () {
    gulp.src('angular-modules/**/*.js')
      
      .pipe(eslint({
        configFile: 'config-files/.eslintrc',
        globals: {
            'jQuery': false,
            'angular': false
        },
        envs: [
            'browser'
        ]
      }))
      .pipe(eslint.formatEach('compact', process.stderr))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dest/js'))
      ;
});

gulp.task('html:template', function(){
  gulp.src('angular-modules/**/*.html')
    .pipe(htmlhint('config-files/.htmlhintrc'))
    .pipe(htmlhint.reporter())
    // .pipe(concat('all.js'))
    .pipe(gulp.dest('dest'))
    ;
});

gulp.task('html:page', function(){
  gulp.src('src/*.html')
    .pipe(htmlhint('config-files/.htmlhintrc'))
    .pipe(htmlhint({
        "doctype-first": true,
        "doctype-html5": true,
        "title-require": true,
        "style-disabled": true
    }))
    .pipe(htmlhint.reporter())
    ;

});


gulp.task('sass', ['clean'], function () {
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







