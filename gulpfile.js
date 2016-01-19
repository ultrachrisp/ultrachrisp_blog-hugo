var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
	nodeReset = require('node-reset-scss'),
	order = require('gulp-order'),
	del = require('del');

gulp.task('styles', function () {
	return gulp.src('src/scss/main.scss')
		.pipe(sass({includePaths: [nodeReset.includePath, './node_modules/susy/sass', './bourbon']}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest('static/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('static/css'))
		.pipe(notify({message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
	return gulp.src('src/js/**/*.js')
        .pipe(order([
            "myScripts.js"
        ]))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('static/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('static/js'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function () {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('static/img'))
		.pipe(notify({ message: 'Images task completed' }));
});

gulp.task('clean', function (cb) {
	del(['static/css', 'static/js', 'static/img', 'public/**', '!public'], cb);
});

gulp.task('default', ['clean', 'styles', 'scripts', 'images']);

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch(['static/**']).on('change', livereload.changed);
});