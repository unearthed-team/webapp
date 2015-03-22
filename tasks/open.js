var gulp = require('gulp');
var open = require('gulp-open');
var embedlr = require("gulp-embedlr");
var livereload = require('gulp-livereload');

var opened = false;
livereload({start: true});

gulp.task('open', ['embedlr'], function(){
    
  if (opened == false) {
    gulp.src("./tmp/app.html")
      .pipe(open('<%file.path%>'));
    opened = true;
  }
  else {
    livereload.reload('app.html')
  }
});
