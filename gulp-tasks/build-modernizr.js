module.exports = function (gulp, plugins, config) {

    var fileFromString = function(filename, string) {
        var src = require('stream').Readable({ objectMode: true });

        src._read = function () {
          this.push(new plugins.gutil.File({
            cwd: "",
            base: "",
            path: filename,
            contents: new Buffer(string) 
          }));

          this.push(null); // end filestream
        }
        return src
    };

    return function () {

      plugins.modernizr.build(config, function (result) {
        
        return fileFromString("modernizr.js", result)
          .pipe(gulp.dest('libs/'))
          .pipe(plugins.uglify())
          .pipe(plugins.rename({extname: '.min.js' }))
          .pipe(gulp.dest('libs/'));

      });

    };

}