module.exports = function(gulp, plugins, config, htmlVars){
    
    var angularTemplateTag = function (path, file) {
        var scriptTag = '<script type="text/ng-template" id="' + path.substr(1) + '">'; // remove forward slash
        return scriptTag + file.contents.toString('utf8') + '</script>';
    };

    var templateStream = 
        gulp.src(['angular-modules/**/*.html', '!angular-modules/pages/**'])
            .pipe(plugins.htmlMin({ collapseWhitespace: true }))
            .pipe(plugins.htmlhint(config))
            .pipe(plugins.htmlhint.reporter())
        ;


    return function(){

        // Differing rules for full html page
        var pageLintConfig = plugins.extend(config, {
          "doctype-first": true,
          "doctype-html5": true,
          "title-require": true
        });

        gulp.src('src/*.html')
            .pipe(plugins.template(htmlVars))
            .pipe(plugins.htmlhint(pageLintConfig))
            .pipe(plugins.htmlhint.reporter())
            .pipe(plugins.inject(
                gulp.src('src/critical.css')
                    .pipe(plugins.cssmin()), 
                { 
                    transform: function(filePath, file) {
                        return '<style>' + file.contents.toString('utf8') + '</style>';
                    }
                }
            ))
            .pipe(plugins.inject(
                templateStream, 
                { 
                    starttag: '<!-- inject:partials:{{ext}} -->',
                    transform: function (filePath, file) {
                        return angularTemplateTag(filePath, file);
                    }
                })
            ).pipe(gulp.dest('./dest'));
        
    }
};