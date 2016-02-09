'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task('default', ['babel', 'sass']);

gulp.task('babel', function () {
    return gulp.src('public/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
  gulp.src('public/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('public/css/**/*.scss', ['sass']);
  gulp.watch('public/js/**/*.js', ['babel']);
});