module.exports = function(gulp, plugins, config){
    
    var myFunc = function (path, file) {
        var scriptTag = '<script type="text/ng-template" id="' + path + '">' + '\n';
        return scriptTag + file.contents.toString('utf8') + '\n' + '</script>';
    };

    var templateStream = 
        gulp.src(['angular-modules/**/*.html', '!angular-modules/pages/**'])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.htmlhint(config))
            .pipe(plugins.htmlhint.reporter())
        ;


    return function(){

        // Differing rules for full html page
        var pageLintConfig = plugins.extend(config, {
          "doctype-first": true,
          "doctype-html5": true,
          "title-require": true,
          "style-disabled": true
        });

        gulp.src('src/*.html')
            .pipe(plugins.htmlhint(pageLintConfig))
            .pipe(plugins.htmlhint({
                "doctype-first": true,
                "doctype-html5": true,
                "title-require": true,
                "style-disabled": true
            }))
            .pipe(plugins.htmlhint.reporter())
            .pipe(plugins.inject(
                templateStream, { 
                    read: false ,
                    starttag: '<!-- inject:partials:{{ext}} -->',
                    transform: function (filePath, file) {
                        return myFunc(filePath, file);
                    }
                })
            ).pipe(gulp.dest('./dest'));
        
    }
};