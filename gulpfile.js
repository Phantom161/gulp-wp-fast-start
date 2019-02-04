var syntax        = 'sass', // выберете используемый синтаксис sass или scss, и перенастройте нужные пути в файле gulp.js и папки в вашего шаблоне wp
		gulpversion   = '4'; // Выберете обязателньо свою версию Gulp: 3 или 4

var gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    browsersync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    cache         = require('gulp-cache'),
    cleancss      = require('gulp-clean-css'),
    ftp           = require('vinyl-ftp'),
		imagemin      = require('gulp-imagemin'),
		notify        = require('gulp-notify'),
		pngquant      = require('imagemin-pngquant'),
		gutil         = require('gulp-util' ),
		rename        = require('gulp-rename'),
		rsync         = require('gulp-rsync'),
		sass          = require('gulp-sass'),
		uglify        = require('gulp-uglify');

	
// Незабываем менять 'wp-gulp.loc' на свой локальный домен
gulp.task('browser-sync', function() {
	browsersync({
		proxy: "wp-gulp.loc",
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "gulp-wp-fast-start", //Demonstration page: http://gulp-wp-fast-start.localtunnel.me
	})
});


// Обьединяем файлы sass, сжимаем и переменовываем
gulp.task('styles', function() {
	return gulp.src('src/wp-content/themes/twentyseventeen/assets/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	//.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('src/wp-content/themes/twentyseventeen/assets/css'))
	.pipe(browsersync.stream())
});


// Обьединяем файлы скриптов, сжимаем и переменовываем
gulp.task('scripts', function() {
	return gulp.src([
		'src/wp-content/themes/twentyseventeen/assets/js/global.js',
		//'src/wp-content/themes/twentyseventeen/assets/libs/jquery/dist/jquery.min.js', // Connecting my scripts
		//'src/wp-content/themes/twentyseventeen/assets/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('src/wp-content/themes/twentyseventeen/assets/js'))
	.pipe(browsersync.reload({ stream: true }))
});


// сжимаем картинки в папке images в шаблоне, и туда же возвращаем в готовом виде
gulp.task('imgmin-theme', function() {
	return gulp.src('src/wp-content/themes/twentyseventeen/assets/images/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('src/wp-content/themes/twentyseventeen/assets/images'));
});


// сжимаем картинки в папке uploads, и туда же возвращаем в готовом виде
gulp.task('imgmin-uploads', function() {
	return gulp.src('src/wp-content/uploads/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('src/wp-content/uploads'));
});


// Отгрузка всего сайта на хостинг
gulp.task('deploy-site', function() { 
	var conn = ftp.create({
		host:      '11.111.111.111', // or domain
		user:      'user ftp',
		password:  'password ftp',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'src/**', // Путь до готовой папки вашего сайта к отгрузки на хостинг
	//'src/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/domain.com/')); // Путь до папки сайта на хостинге
});


// Отгрузка только шаблона на хостинг
gulp.task('deploy-theme', function() {
	var conn = ftp.create({
		host:      '11.111.111.111', // or domain
		user:      'user ftp',
		password:  'password ftp',
		parallel:  10,
		log: gutil.log
	});
	var globs = [
	'src/wp-content/themes/twentyseventeen/**', // Путь до шаблона у вас на компьютере
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/www/domain.com/wp-content/themes/twentyseventeen/')); // Путь до шаблона на хостинге
});


// Отгрузка или всего сайта, или какой то папки по SSH, настроите нужный путь сами
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


if (gulpversion == 3) {
  gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
	  gulp.watch(['src/wp-content/themes/twentyseventeen/assets/sass/**/*.sass'], ['styles']); // Наблюдение за sass файлами в папке sass в теме
	  gulp.watch(['src/wp-content/themes/twentyseventeen/assets/libs/**/*.js', 'src/wp-content/themes/twentyseventeen/assets/js/common.js'], ['scripts']); // Наблюдение за JS файлами js в теме
    gulp.watch('src/wp-content/themes/twentyseventeen/**/*.php', browsersync.reload) // Наблюдение за sass файлами php в теме
  });
  gulp.task('default', ['watch']);
}


if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('src/wp-content/themes/twentyseventeen/assets/sass/**/*.sass', gulp.parallel('styles')); // Наблюдение за sass файлами в папке sass в теме
		gulp.watch(['src/wp-content/themes/twentyseventeen/assets/libs/**/*.js', 'src/wp-content/themes/twentyseventeen/assets/js/common.js'], gulp.parallel('scripts')); // Наблюдение за JS файлами в папке js
    gulp.watch('src/wp-content/themes/twentyseventeen/**/*.php', browsersync.reload) // Наблюдение за sass файлами php в теме
	});
	gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
}
