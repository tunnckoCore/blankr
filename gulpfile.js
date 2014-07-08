var gulp = require('gulp');
var through2 = require('through2');
var jed = require('gulp-j140');
var countFiles = 1, dateformat=require('dateformat'), ms = require('pretty-ms')

gulp.task('default', function () {
  return gulp.src(['./**/*.{md,json}','./**/.*'])
    .pipe(through2.obj(function (file, _, next) {
      if (countFiles === 1) {
        start = Date.now()
      }
      countFiles++
      this.push(file)
      next()
    }))
    .pipe(jed({name: 'Charlike'}))
    .pipe(gulp.dest('build-gulp'))
    .pipe(through2.obj(function (obj, _, next) {
      //console.log('create:',path.join('build',obj.file.relative))
      next();
    },
    // finish
    function (finish) {
      console.log(dateformat(new Date, '[HH:MM:ss]') + ' Found ' + countFiles + ' files')
      finish()
    }))
});