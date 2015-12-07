/* required methods */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(['app/css/style.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
});

//browser-reload
gulp.task('browser-reload', browserSync.reload);

gulp.task('watch', function() {
    browserSync({
        server: {
            baseDir: 'app/'
        }
    });

    gulp.watch('app/*.html', ['browser-reload']);
    gulp.watch('app/css/*.scss', ['sass', 'browser-reload']);
    gulp.watch('app/js/*.js', ['browser-reload']);

});