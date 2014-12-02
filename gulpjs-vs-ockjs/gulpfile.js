var gulp = require('gulp');
var through2 = require('through2');
var jed = require('gulp-j140');
var countFiles = 1, dateformat=require('dateformat'), ms = require('pretty-ms')
var started

//
// './**/*.json' - 2969 files
// ock - ~10-12s.
//

//
// './**/*.json' - 4200+ files
// ock after gulp - ~18-22s.
//

//
// './**/*.json' - 2969 files
// gulp - ~20-26s.
//

gulp.task('default', function () {
  //return gulp.src(['./try-catch/*.*', './try-catch/.*'])
  return gulp.src(['./**/*.json'])
    .pipe(through2.obj(function (file, _, next) {
      if (countFiles === 1) {
        started = new Date
      }
      countFiles++
      console.log('[%s] #%s estimate `%s`', dateformat(new Date, 'HH:MM:ss'), countFiles, ms(new Date - started))
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
      console.log('[%s] Found %s files', dateformat(new Date, 'HH:MM:ss'), countFiles)
      finish()
    }))
});
