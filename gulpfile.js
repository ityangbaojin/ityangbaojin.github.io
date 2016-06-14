var gulp = require('gulp'),  // 引入 gulp
    minifycss = require('gulp-minify-css'), // css压缩
    concat = require('gulp-concat'), // 文件合并
    uglify = require('gulp-uglify'), // js压缩
    rename = require('gulp-rename'), // 文件更名
    del    = require('del'); 		 // 删除
    notify = require('gulp-notify'); // 提示信息

// 默认命令，在cmd中输入gulp后，执行。
gulp.task('default', function() {
    gulp.start('css', 'js');
});


// 合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src('assets/css/*.css')  			// 压缩的文件
    .pipe(concat('all.css'))					// 文件合并		
    .pipe(gulp.dest('build/assets/css'))		// 输出文件夹
    .pipe(rename({ suffix: '.min' }))			// 文件更名
    .pipe(minifycss())							// 压缩	
    .pipe(gulp.dest('build/assets/css'))		// 输出文件夹
    .pipe(notify({ message: 'css task ok' }));	// 提示信息
});

// 合并、压缩js文件
gulp.task('js', function() {
  // return gulp.src('assets/js/*.js')
  return gulp.src([
  		'assets/js/jquery.min.js',
  		'assets/js/bootstrap.min.js',
  		'assets/js/social-share.min.js',
  		'assets/js/js.js',
  	])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('build/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(notify({ message: 'js task ok' }));
});
 