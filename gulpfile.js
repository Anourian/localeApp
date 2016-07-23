var gulp = require('gulp');
var merge = require('gulp-merge-json');

gulp.task('cldr', function() {
  gulp.src('./node_modules/cldr-misc-full/main/**/delimiters.json')
    .pipe(merge('combined.json'))
    .pipe(gulp.dest('src/client/public'));
});
gulp.task('default', ['cldr']);