var gulp = require('gulp');
var shell = require('gulp-shell');


gulp.task('server',shell.task([
  'open http://localhost:3000/',
  'python -m SimpleHTTPServer 3000'
],{cwd:'./public'}));
