'use strict';
 
var gulp = require('gulp'),
	del = require('del'),
  debug = require('gulp-debug'),
  rename = require("gulp-rename"),

	sass = require('gulp-sass'),

	sourcemaps = require('gulp-sourcemaps'),

  // html plugins
  htmlhint = require('gulp-htmlhint'),
  templateCache = require('gulp-angular-templatecache'),

  // javascript plugins
  eslint = require('gulp-eslint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),

  modernizr = require("modernizr"),

  gutil = require('gulp-util'), // gulp utilities
 
  Stream = require('stream'),

  mzrConfig = require('./config-files/modernizr-config.json')

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
    .pipe(sourcemaps.init())
    .pipe(htmlhint('config-files/.htmlhintrc'))
    .pipe(htmlhint.reporter())
    .pipe(templateCache('html-partials.js', {
        standalone: true,
        module: 'dhPartials',
        root: 'angular-modules'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dest/js'))
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


gulp.task('modernizr', function(){
  
  function fileFromString(filename, string) {
  var src = require('stream').Readable({ objectMode: true });

    src._read = function () {
      this.push(new gutil.File({
        cwd: "",
        base: "",
        path: filename,
        contents: new Buffer(string) 
      }));

      this.push(null); // end filestream
    }
    return src
  }
  
  modernizr.build({
    "options": [], 
    "feature-detects": [
      "css/flexbox",
      "svg"
    ]
  }, function (result) {
    
    return fileFromString("modernizr.js", result)
      //.pipe(gulp.dest('libs/'))
      .pipe(uglify())
      .pipe(rename({extname: '.min.js' }))
      .pipe(gulp.dest('libs/'));

  });
    
});


gulp.task('sass', ['clean'], function () {
  gulp.src('scss/*.scss')
  	.pipe(sourcemaps.init())
    //.pipe(debug({title: 'unicorn:'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dest/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('build', ['clean'], function(){
    console.log('cleaning done, go');
});


gulp.task('default', [ 'copy', 'sass', 'scripts', 'html:template' ]);







