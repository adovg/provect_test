"use strict";

const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create(); 

//Порядок подключения css файлов
const cssFiles = [
	'./src/css/main.css',
	'./src/css/media.css',
]

//Порядок подключения js файлов
const jsFiles = [
	'./src/js/lib.js',
	'./src/js/main.js',
]

//Таск на стили
function styles() {
	return gulp.src(cssFiles)

	.pipe(concat('style.css'))
	//Добавить префиксы
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	//Минификация CSS
	.pipe(cleanCSS({
		level: 2
	}))
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
};




// task for Js
function scripts() {
	return gulp.src(jsFiles)

	.pipe(concat('script.js'))
	//Минификация Js
	// .pipe(uglify()) classic
	.pipe(uglify(/* options */))
  	.pipe(gulp.dest('./build/js'))
  	.pipe(browserSync.stream());
};

//Task to watch 
function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //watch CSS
gulp.watch('./src/css/**/*.css', styles);  
	//watch JS
gulp.watch('./src/js/**/*.js', styles);    
	//wathc HTML
gulp.watch('./*.html').on('change', browserSync.reload);
};

//Task for clean
function clean () {
	return del(['build/*'])
};

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));