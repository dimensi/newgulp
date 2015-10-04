var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var outputDir = 'public';
var assetDir = 'assets';


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        },
        reloadDelay: 1500,
        browser: "google chrome",
    });
});
	// Собираем Stylus
// Собираем Stylus
gulp.task('stylus', function() {
    gulp.src('./assets/stylus/*.styl')
        .pipe(stylus()) // собираем stylus
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(autoprefixer())
    .pipe(gulp.dest(outputDir+'/css/')) // записываем css
    .pipe(browserSync.stream()); // даем команду на перезагрузку css
});
// Собираем css
gulp.task('csstouse', function() {
    gulp.src('./assets/stylus/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest(outputDir+'/css/')) // записываем css
    .pipe(browserSync.stream()); // даем команду на перезагрузку css
});
//Собираем шрифты
gulp.task('fonts', function() {
    gulp.src('./assets/fonts/*.*')
    .pipe(gulp.dest(outputDir+'/fonts/')) // записываем css
    .pipe(browserSync.stream()); // даем команду на перезагрузку css
});
// Собираем html из Jade

gulp.task('jade', function() {
    gulp.src([assetDir+'/template/*.jade', '!'+assetDir+'/template/_*.jade'])
        .pipe(jade({
            pretty: true
        }))  // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest(outputDir)) // Записываем собранные файлы
    .pipe(browserSync.stream()); // даем команду на перезагрузку страницы
});

// Собираем JS
gulp.task('js', function() {
    gulp.src([assetDir+'/js/**/*.js', '!'+assetDir+'/js/vendor/**/*.js'])
        .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest(outputDir+'/js'))
        .pipe(browserSync.stream()); // даем команду на перезагрузку страницы
});

gulp.task('images', function() {
    gulp.src(assetDir+'/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(outputDir+'/images'))
});

 /*   gulp.task('connect', function() {
      connect.server({
          root: outputDir,
          livereload: true
      });
    }); */

// Запуск сервера разработки gulp watch
gulp.task('watch', function() {
    // Предварительная сборка проекта
    gulp.watch(assetDir+'/stylus/**/*.styl', ['stylus']);
    gulp.watch(assetDir+'/stylus/**/*.css', ['csstouse']);
    gulp.watch(assetDir+'/template/**/*.jade', ['jade']);
    gulp.watch(assetDir+'/img/**/*', ['images']);
    gulp.watch(assetDir+'/js/**/*', ['js']);
    gulp.watch(outputDir+'/*.html').on('change', browserSync.reload);
});

gulp.task ('default',['stylus','csstouse','jade','images','js','fonts','watch','browser-sync']);

