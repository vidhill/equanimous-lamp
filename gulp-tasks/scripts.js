module.exports = function (gulp, plugins, pkg ) {

  return function () {

      var headerText = plugins.fs.readFileSync('build-config-files/js-header-text.js', 'utf8');
      var d = new Date();

      gulp.src('angular-modules/**/*.js')
        .pipe(plugins.eslint({
          configFile: 'build-config-files/.eslintrc',
          globals: {
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
        .pipe(plugins.header(headerText + '\n' , { pkg: pkg, date: d.toDateString() } ))
        .pipe(gulp.dest('dest/js'))
        ;



  };

}
