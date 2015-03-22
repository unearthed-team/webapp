var gulp = require('gulp');

gulp.task('copy', function(cb) {

  gulp.src(['./src/**/*'])
    .pipe(gulp.dest('./dist'))
    .on('end', cb);

});
