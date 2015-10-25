var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    gulpFilter = require('gulp-filter'),
    wiredep = require('wiredep').stream,

    mainBowerFiles = require('gulp-main-bower-files');;

var path = {
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

gulp.task('clean', function(){

  gulp.src( './prod/**/*' )
    .pipe( rimraf() );

})

gulp.task('bower_build', function(){
  var jsOnly = gulpFilter(['**/*.js'], { restore: true } ),
      cssOnly = gulpFilter(['**/*.css'], { restore: true } );

  return gulp.src('./bower.json')
    .pipe( mainBowerFiles( ) )

    .pipe( jsOnly )
    .pipe( uglify() )
    .pipe( concat( 'plugins.js' ) )
    .pipe( gulp.dest('./prod/') )
    .pipe( jsOnly.restore )

    .pipe( cssOnly )
    .pipe( concat( 'plugins.css' ) )
    .pipe( minifyCss( {
      keepSpecialComments: 0
    }) )
    .pipe( gulp.dest( './prod/' ) );

});
