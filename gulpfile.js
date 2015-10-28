var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    gulpFilter = require('gulp-filter'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    rigger = require('gulp-rigger'),
    // base64 = require('gulp-base64'),
    rebase = require('gulp-css-url-rebase');

var path = {
  dev: {
    html: './dev/html/*.html',
    scss: './dev/static/scss/**/*.scss',
    js: './dev/static/js/**/*.js',
    wiredepFolder: './dev/html-preview'
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
    .pipe( rigger() )
    .pipe(gulp.dest( path.dev.wiredepFolder ));
});

gulp.task('clean', function(){

  gulp.src( './prod/**/*' )
    .pipe( rimraf() );

})

gulp.task('bower_build', function(){

  var assets = useref.assets();
 
  return gulp.src( path.dev.html )
    .pipe( assets )
    .pipe( gulpif( '*.js', uglify() ) )
    .pipe( gulpif( '*.css', rebase() ) )
    // .pipe( gulpif( '*.css', base64( {
    //   debug: true
    // } ) ) )    
    .pipe( gulpif( '*.css', minifyCss() ) )
    .pipe( assets.restore() )
    .pipe( useref() )
    .pipe( gulp.dest( path.prod.html ) );

})
