module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('scss/*.scss')
            .pipe(plugins.sourcemaps.init())
            //.pipe(debug({title: 'unicorn:'}))
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.sourcemaps.write('./maps'))
            .pipe(gulp.dest('dest/css'));

    };
};