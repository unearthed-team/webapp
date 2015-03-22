var gulp = require('gulp');
var jade = require('gulp-jade');
var inlineBase64 = require('gulp-inline-base64');
var smoosher = require('gulp-smoosher');
var rename = require('gulp-rename');

gulp.task('buildSync', function(cb) {
  var locals = {};

  gulp.src('./src/templates/app.jade')
    .pipe(jade({
      pretty: true
    }))
    /*
    Switched to cache manifest
    .pipe(smoosher({
      base: 'src'
    }))
    .pipe(inlineBase64({
        baseDir: 'src',
        maxSize: 14 * 1024,
        debug: true
        
    }))*/
    .pipe(rename('app.html'))
    .pipe(gulp.dest('./dist/'))
    .on('end', function() {
      cb();
      return;
    });

});
