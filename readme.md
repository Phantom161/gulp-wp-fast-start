<meta charset="utf-8">

Gulp for WordPress for quick project launch `v2.1`

To work with this startup template, you need `Gulp`, any `local server`,  and the `CMS WordPress`!

-----------
Used Gulp Packages:

  - gulp
  - gulp-util
  - gulp-sass
  - browser-sync
  - gulp-concat
  - gulp-uglify
  - gulp-clean-css
  - gulp-rename
  - gulp-notify
  - gulp-rsync
  - gulp-imagemin
  - gulp-cache
  - imagemin-pngquant
  - gulp-autoprefixer
  - vinyl-ftp

-----------
Installing the required `Gulp` packages:
```
  $ npm i gulp --save-dev
  $ npm i gulp-util --save-dev
  $ npm i gulp-sass --save-dev
  $ npm i browser-sync --save-dev
  $ npm i gulp-concat --save-dev
  $ npm i gulp-uglify --save-dev
  $ npm i gulp-clean-css --save-dev
  $ npm i gulp-rename --save-dev
  $ npm i gulp-notify --save-dev
  $ npm i gulp-rsync --save-dev
  $ npm i gulp-imagemin --save-dev
  $ npm i gulp-cache --save-dev
  $ npm i imagemin-pngquant --save-dev
  $ npm i gulp-autoprefixer --save-dev
  $ npm i vinyl-ftp --save-dev
```
or:
```
  $ npm i gulp gulp-util gulp-sass browser-sync gulp-concat gulp-uglify gulp-clean-css gulp-rename gulp-notify gulp-rsync gulp-imagemin gulp-cache imagemin-pngquant gulp-autoprefixer vinyl-ftp --save-dev
```
Install globally:
```
  $ npm i gulp
  $ npm i gulp-util
  $ npm i gulp-sass
  $ npm i browser-sync
  $ npm i gulp-concat
  $ npm i gulp-uglify
  $ npm i gulp-clean-css
  $ npm i gulp-rename
  $ npm i gulp-notify
  $ npm i gulp-rsync
  $ npm i gulp-imagemin
  $ npm i gulp-cache
  $ npm i imagemin-pngquant
  $ npm i gulp-autoprefixer
  $ npm i vinyl-ftp
```
or:
```
  $ npm i gulp gulp-util gulp-sass browser-sync gulp-concat gulp-uglify gulp-clean-css gulp-rename gulp-notify gulp-rsync gulp-imagemin gulp-cache imagemin-pngquant gulp-autoprefixer vinyl-ftp
```

## A list of tasks and assign


* **browser-sync** - Auto-update of your page
* **sass** - Compiles all SASS files in your project into a single CSS file
* **js** - Collects and compresses all your JS files into one large file
* **watch** - Keeps track of changes in all files of your website template to auto-update and show you the changes
* **imgmin-theme** - Compresses all images to the best state in your template
* **imgmin-uploads** - Compresses all images in the uploads folder to the best state
* **deploy-site** - Sends all your website to web hosting via FTP
* **deploy-theme** - Sends your ready-made website template to web hosting via FTP
* **rsync** - Sends a ready-made website template or a full website for hosting via SSH


## Call/use Task

```
$ gulp imgmin-theme
$ gulp imgmin-uploads
$ gulp deploy-site
$ gulp deploy-theme
$ gulp rsync
```
------------

If you have any questions or suggestions, I will be happy to answer:

https://pinchukov.net