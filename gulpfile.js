var gulp   = require('gulp'),
    to5    = require('gulp-6to5');
    sass   = require('gulp-sass'),
    cached = require('gulp-cached'),
    watch  = require('gulp-watch');

gulp.task('html', function () {
    return gulp.src('client/**/*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('scss', function () {
    return gulp.src('client/scss/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('js', function () {
    return gulp.src('client/js/**/*.js')
        .pipe(cached('scripts')) 
        .pipe(to5({ modules: 'amd' }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', ['html', 'scss', 'js'], function () {
    gulp.watch("client/**/*.html", ['html']);
    gulp.watch("client/**/*.js",   ['js']);
    gulp.watch("client/**/*.scss", ['scss']);
});

gulp.task('default', ['html', 'scss', 'js'], function () {
});
