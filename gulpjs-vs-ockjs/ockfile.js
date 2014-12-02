var readdirp = require('readdirp');
var through2 = require('through2');
var mkdirp = require('mkdirp');
var fs = require('fs')
var path = require('path')
var extend = require('extend')
var cyan = function cyanColor(str) {
  return '\u001b[36m'+str+'\u001b[39m'
}
var countFiles = 1,
  started;
var files = [],
  dateformat = require('dateformat')
var globalFile, buffers = [];
var jed = require('j140');
var cwd = process.cwd();
var ms = require('pretty-ms')
var stream = readdirp({
  //root: './try-catch/',
  //fileFilter: ['*.{json,yml,md,js}', '.*'] //8196 - gulp 1min 25sec.; 4179 - ock 16sec;
  root: './',
  fileFilter: ['*.json']
});
stream
  // normalize virtual file format
  .pipe(through2.obj(function(file, _, next) {
    if (countFiles === 1) {
      started = new Date
console.log('[%s] Using ockfile ~/%s', dateformat(started, 'HH:MM:ss'), __filename.split('/').slice(3).join('/'))
console.log('[%s] Starting `%s`...', dateformat(started, 'HH:MM:ss'), cyan('default'))
    }
    countFiles++
    var rs = fs.createReadStream(file.fullPath);
    globalFile = {
      cwd: cwd,
      dir: {
        absolute: file.fullParentDir,
        relative: file.parentDir,
      },
      file: {
        name: file.name,
        absolute: file.fullPath,
        relative: file.path,
      },
      isDir: file.stat.isDirectory(),
      isFile: file.stat.isFile(),
      stat: file.stat,
      name: file.name,
      stream: rs,
      buffer: [],
      contents: ''
    };
    console.log('[%s] #%s estimate `%s`', dateformat(new Date, 'HH:MM:ss'), countFiles, ms(Date.now() - started))
    //console.log('[%s] #%s `%s`', dateformat(started, 'HH:MM:ss'), countFiles, globalFile.file.relative)
    files.push(globalFile)
    this.push(globalFile)
    next();
  }))
  .on('error', function(err) {
    console.log('normalize virtual file format', err)
  })

  //
  // get contents / set buffer
  // 
  .pipe(through2.obj(function(obj, _, next) {

    var self = this;
    /* get file contents asyncly */
    obj.stream.on('data', function(chunk) {
      obj.buffer.push(chunk)
    })
    .on('error', function(err) {
      console.log('// get contents / set buffer',err)
    })
    .on('end', function() {
      self.push(obj)
      next();
    });
  }))
  .on('error', function(err) {
    console.log('get contents / set buffer', err)
  })

  //
  // compiling
  // 
  .pipe(through2.obj(function(obj, _, next) {
    obj.contents = jed(obj.buffer.toString('utf8'), {
      name: 'Charlike'
    })
    this.push(obj)
    next();
  }))
  .on('error', function(err) {
    console.log('compiling', err)
  })

  //
  // writing
  // 
  .pipe(through2.obj(function(obj, _, next) {
    var destDirs = path.join(__dirname, 'build-ock', obj.dir.relative)
    mkdirp(destDirs, function(err) {
      if (!err) {
        var dest = path.join(__dirname, 'build-ock', obj.file.relative)
        var ws = fs.createWriteStream(dest)
          //rs.pipe(ws)
      }
      if (err) console.log('// writing', err)
    })
    this.push(obj)
    next();
  }))
  .on('error', function(err) {
    console.log('writing', err)
  })

  //
  // listing
  // 
  .pipe(through2.obj(function(obj, _, next) {

    //console.log('[%s] started before `%sms`', dateformat(new Date(), 'HH:MM:ss'), ms(Date.now() - started))
    //console.log('create:',path.join('build',obj.file.relative))
    next();
  },

  //
  // finish
  //
  function(finish) {
    console.log('[%s] Started at `%s`', dateformat(new Date, 'HH:MM:ss'), dateformat(started, 'HH:MM:ss'))
    console.log('[%s] Found %s files', dateformat(new Date, 'HH:MM:ss'), countFiles)
    console.log('[%s] Finished `%s` after %s', dateformat(new Date, 'HH:MM:ss'), cyan('default'), ms(Date.now() - started))
    finish()
  }))
  .on('error', function(err) {
    console.log('listing (finish)', err)
  })
/*
mkdirp(__dirname + '/build-ock/'+file.path.replace(file.name, ''), function(err) {
  if (!err) {
    var rs = fs.createReadStream(file.fullPath);
    globalFile.filepath = path.dirname(file.fullPath);
    globalFile.filename = file.name;
    globalFile.stat = file.stat;
    globalFile.stream = rs;
    //var ws = fs.createWriteStream(__dirname + '/build-ock/'+file.path)
    //rs.pipe(ws)
  }
})
this.push(globalFile)
next();*/
