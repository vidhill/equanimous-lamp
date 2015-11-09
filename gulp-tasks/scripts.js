module.exports = function (gulp, plugins) {

  return function () {

      gulp.src('angular-modules/**/*.js')  
        .pipe(plugins.eslint({
          configFile: 'config-files/.eslintrc',
          globals: {
              'jQuery': false,
              'angular': false
          },
          envs: [
              'browser'
          ]
        }))
        .pipe(plugins.eslint.formatEach('compact', process.stderr))
        .pipe(plugins.sourcemaps.init({loadMaps: true}))
        .pipe(plugins.concat('all.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dest/js'))
        ;

  };

}
