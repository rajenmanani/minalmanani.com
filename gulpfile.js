var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var pug = require('gulp-pug');
// var mainBowerFiles = require('main-bower-files')

// gulp.task('mainBowerFiles', function() {
//   return gulp.src(mainBowerFiles())
//     .pipe(gulp.dest('app/scr'))
// })

gulp.task('pug', function(){
  return gulp.src(['app/views/**/*.+(pug|jade)','!app/views/includes/**/*.*'])
  .pipe(pug({
    doctype: 'html',
    pretty: true
  }))
  .pipe(gulp.dest('app'));
})

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    browser: 'google Chrome',
    notify: false
  })
})

gulp.task('watch', ['browserSync', 'pug', 'sass'], function() {
  gulp.watch('app/views/**/*.+(pug|jade)', ['pug']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
  .pipe(gulp.dest('dist/images'))
})

gulp.task('js', ['useref'], function() {
  return gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'))
})

gulp.task('clean:dist', function() {
	return del.sync('dist')
})

gulp.task('build', function(callback) {
	runSequence('clean:dist', ['sass', 'useref', 'fonts', 'images', 'js'],
		callback
	);
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
