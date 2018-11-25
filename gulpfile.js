var gulp          = require('gulp'),
		gutil         = require('gulp-util'),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),
		imagemin      = require('gulp-imagemin'),
		cache         = require('gulp-cache'),
		pngquant      = require('imagemin-pngquant'),
		autoprefixer  = require('gulp-autoprefixer'),
		ftp           = require('vinyl-ftp');


gulp.task('browser-sync', function() {
	browsersync({
		proxy: "wp-gulp.loc",
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "gulp-wp-fast-start", //Demonstration page: http://gulp-wp-fast-start.localtunnel.me
	})
});


gulp.task('sass', function() {
	return gulp.src('src/wp-content/themes/twentyseventeen/assets/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	//.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('src/wp-content/themes/twentyseventeen/assets/css'))
	.pipe(browsersync.reload( {stream: true} ))
});


gulp.task('js', function() {
	return gulp.src([
		//'src/wp-content/themes/twentyseventeen/assets/libs/jquery/jquery.min.js', // Connecting my scripts
		//'src/wp-content/themes/twentyseventeen/assets/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('src/wp-content/themes/twentyseventeen/assets/js'))
	.pipe(browsersync.reload({ stream: true }))
});


gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch(['src/wp-content/themes/twentyseventeen/assets/sass/**/*.sass'], ['sass']);
	gulp.watch(['src/wp-content/themes/twentyseventeen/assets/libs/**/*.js', 'src/wp-content/themes/twentyseventeen/assets/js/common.js'], ['js']);
	gulp.watch(['src/wp-content/themes/twentyseventeen/**/*.php', 'src/wp-content/themes/twentyseventeen/**/*.css'], browsersync.reload)
});


gulp.task('imgmin-theme', function() {
	return gulp.src('src/wp-content/themes/twentyseventeen/assets/images/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('src/wp-content/themes/twentyseventeen/assets/images'));
});


gulp.task('imgmin-uploads', function() {
	return gulp.src('src/wp-content/uploads/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('src/wp-content/uploads'));
});


gulp.task('deploy-site', function() {
	var conn = ftp.create({
		host:      '11.111.111.111', // or domain
		user:      'user ftp',
		password:  'password ftp',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'src/**',
	'src/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/domain.com/'));
});


gulp.task('deploy-theme', function() {
	var conn = ftp.create({
		host:      '11.111.111.111', // or domain
		user:      'user ftp',
		password:  'password ftp',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'src/wp-content/themes/twentyseventeen/**',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/domain.com/wp-content/themes/twentyseventeen/'));
});


gulp.task('rsync', function() {
	return gulp.src('src/**')
	.pipe(rsync({
		root: 'src/',
		hostname: 'user123@domain.com',
		destination: 'www/domain.com/',
		// include: ['*.htaccess'], // Hidden files to include in the deployment
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
	// Documentation: https://pinchukov.net/blog/gulp-rsync.html
});


gulp.task('default', ['watch']);