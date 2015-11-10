module.exports = function(gulp, plugins, config){
    
    return {
        template: function(){
            gulp.src('angular-modules/**/*.html')
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.htmlhint(config))
                .pipe(plugins.htmlhint.reporter())
                .pipe(plugins.templateCache('html-partials.js', {
                    standalone: true,
                    module: 'dhPartials',
                    root: 'angular-modules'
                }))
                .pipe(plugins.sourcemaps.write('./maps'))
                .pipe(gulp.dest('dest/js'))
                ;
        },
        page: function(){

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
                ;
        }
    }
};