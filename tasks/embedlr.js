var gulp = require('gulp');
var embedlr = require("gulp-embedlr");

gulp.task('embedlr', ['buildSync', 'copy'], function(cb){
  
  gulp.src('./dist/app.html')
    .pipe(embedlr({
      src: "http://localhost:35729/livereload.js?snipver=1"
    }))
    .pipe(gulp.dest('./tmp'))
    .on('end', cb);
  
});
