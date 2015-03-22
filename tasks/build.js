var gulp = require('gulp');

gulp.task('build', ['buildSync', 'copy'], function() {
  process.nextTick(function() {
    process.exit(0);
  });
});
