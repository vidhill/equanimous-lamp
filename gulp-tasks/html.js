module.exports = function(gulp, plugins, config, htmlVars){

    var getFileContents = function(myFile){
        return myFile.contents.toString('utf8');
    };

    var angularTemplateTag = function (path, file) {
        var scriptTag = '<script type="text/ng-template" id="' + path.substr(1) + '">'; // remove forward slash
        return scriptTag + getFileContents(file) + '</script>';
    };

    var templateStream =
        gulp.src(['angular-modules/**/*.html', '!angular-modules/pages/**'])
            .pipe(plugins.htmlMin({ collapseWhitespace: true }))
            .pipe(plugins.htmlhint(config))
            .pipe(plugins.htmlhint.reporter())
        ;

    var headInject = {
      starttag: '<!-- inject:head -->',
      transform: function(filePath, file) {
          return getFileContents(file);
      }
    };

    var cssInject = {
      starttag: '<!-- inject:css -->',
      transform: function(filePath, file) {
          return '<style>' + getFileContents(file) + '</style>';
      }
    };

    var angularTemplateInject = {
      starttag: '<!-- inject:partials:{{ext}} -->',
      transform: function (filePath, file) {
          // create angular template tag for each
          return angularTemplateTag(filePath, file);
      }
    };

    return function(){

        // Differing rules for full html page
        var pageLintConfig = plugins.extend(config, {
          "doctype-first": true,
          "doctype-html5": true,
          "title-require": true
        });

        gulp.src('src/*.html')
            .pipe(plugins.lodashTemplate(htmlVars))
            .pipe(plugins.htmlhint(pageLintConfig))
            .pipe(plugins.htmlhint.reporter())
            .pipe(plugins.inject(
                gulp.src('src/html-partials/head.html')
                  .pipe(plugins.htmlMin({ collapseWhitespace: true })) // minify contents of head.html
                , headInject
            ))
            .pipe(plugins.inject(
                gulp.src('src/critical.css').pipe(plugins.cssmin()), cssInject
            ))
            .pipe(plugins.inject(
                templateStream,
                angularTemplateInject)
            ).pipe(gulp.dest('./dest')); // put index.html into dest

    }
};
