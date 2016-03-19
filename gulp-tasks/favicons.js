module.exports = function (gulp, plugins, pkg ) {

  var folderName = "favicons";

  var options = {
        logging: false,
        online: false,
        path: folderName,
        icons: {
            android: true,              // Create Android homescreen icon. `boolean`
            appleIcon: true,            // Create Apple touch icons. `boolean`
            appleStartup: false,
            coast: false,
            favicons: true,             // Create regular favicons. `boolean`
            firefox: false,
            opengraph: true,            // Create Facebook OpenGraph image. `boolean`
            twitter: true,              // Create Twitter Summary Card image. `boolean`
            windows: false,
            yandex: false
        }
    };

  return function () {

      return gulp.src("src/myicon.png")
        .pipe(plugins.favicons( options ))
        .pipe(gulp.dest("dest/" + folderName ))
        .on('end', function(){

            // I don't like their manifest, going to make my own
            plugins.del(['dest/' + folderName + '/manifest.json']);
            // copy favicon.ico to root
            gulp.src("dest/favicons/favicon.ico")
              .pipe(gulp.dest("dest"));
        });

  };

}
