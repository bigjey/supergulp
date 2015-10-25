var wiredep = require('wiredep').stream;

var path {
  dev: {
    html: './dev/html/*.html',
    scss: './dev/static/scss/**/*.scss',
    js: './dev/static/js/**/*.js',
    wiredepFolder: './dev/html'
  },
  prod: {
    html: './prod/html',
    scss: './dev/static/scss/**/*.scss',
    js: './dev/static/js/**/*.js'
  }
}

gulp.task('bower', function () {
  gulp.src( path.dev.html )
    .pipe(wiredep({
    }))
    .pipe(gulp.dest( path.dev.wiredepFolder ));
});
