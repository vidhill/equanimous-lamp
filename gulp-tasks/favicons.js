module.exports = function (gulp, plugins, pkg ) {

  var folderName = "favicons/";

  var options = {
        appName: "David Hill's Amazaball Webapp",
        appDescription: pkg.description,
        developerName: pkg.author,
        start_url: "index.html",
        display: "browser",
        version: 1.0,
        logging: false,
        online: false,
        path: folderName,
        pipeHTML: false,
        replace: true,
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

     
      gulp.src("src/myicon.png")
        .pipe(plugins.favicons( options ))
        .pipe(gulp.dest("dest/" + folderName ));

  };

}
