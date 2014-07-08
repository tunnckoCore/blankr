var readdirp = require('readdirp');
var through2 = require('through2');
var mkdirp = require('mkdirp');
var fs = require('fs')
var path = require('path')
var extend = require('extend')
var countFiles = 1,
  start;
var files = [],
  dateformat = require('dateformat')
var globalFile, buffers = [];
var jed = require('j140');
var cwd = process.cwd();
var ms = require('pretty-ms')
var stream = readdirp({
  root: './',
  fileFilter: ['*.{md,json}', '.*']
});
stream
// normalize virtual file format
.pipe(through2.obj(function(file, _, next) {
  if (countFiles === 1) {
    start = Date.now()
    console.log(dateformat(new Date, '[HH:MM:ss]') + ' Using readdirp ~/' + __filename.split('/').slice(3).join('/'))
    console.log(dateformat(new Date, '[HH:MM:ss]') + ' Starting `default`...')
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
  files.push(globalFile)
  this.push(globalFile)
  next();
}))
// get contents / set buffer
.pipe(through2.obj(function(obj, _, next) {
  var self = this;
  /* get file contents asyncly */
  obj.stream.on('data', function(chunk) {
    obj.buffer.push(chunk)
  }).on('end', function() {
    self.push(obj)
    next();
  });
}))
// compiling
.pipe(through2.obj(function(obj, _, next) {
  obj.contents = jed(obj.buffer.toString(), {
    name: 'charlike'
  })
  this.push(obj)
  next();
}))
// writing
.pipe(through2.obj(function(obj, _, next) {
  var destDirs = path.join(__dirname, 'build-readdirp', obj.dir.relative)
  mkdirp(destDirs, function(err) {
    if (!err) {
      var dest = path.join(__dirname, 'build-readdirp', obj.file.relative)
      var ws = fs.createWriteStream(dest)
        //rs.pipe(ws)
    }
  })
  this.push(obj)
  next();
}))
// listing
.pipe(through2.obj(function(obj, _, next) {
    //console.log('create:',path.join('build',obj.file.relative))
    next();
  },
  // finish
  function(finish) {
    console.log(dateformat(new Date, '[HH:MM:ss]') + ' Finished `default` after ' + ms(Date.now() - start))
    console.log(dateformat(new Date, '[HH:MM:ss]') + ' Found ' + countFiles + ' files')
    finish()
  }))
/*
mkdirp(__dirname + '/build-readdirp/'+file.path.replace(file.name, ''), function(err) {
  if (!err) {
    var rs = fs.createReadStream(file.fullPath);

    globalFile.filepath = path.dirname(file.fullPath);
    globalFile.filename = file.name;
    globalFile.stat = file.stat;
    globalFile.stream = rs;
    //var ws = fs.createWriteStream(__dirname + '/build-readdirp/'+file.path)
    //rs.pipe(ws)
  }
})
this.push(globalFile)
next();*/