'use strict'

var fs = require('fs')
var path = require('path')
var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Load methods
 */

require('./compile', 'methods.compile')
require('./compileSync', 'methods.compileSync')
require('./compileFile', 'methods.compileFile')
require('./compileFileSync', 'methods.compileFileSync')

require('./render', 'methods.render')
require('./renderSync', 'methods.renderSync')
require('./renderFile', 'methods.renderFile')
require('./renderFileSync', 'methods.renderFileSync')

/**
 * Lazily required module dependencies
 */

require('delegate-properties', 'delegate')
require('extend-shallow', 'extend')
require('is-buffer')
require = fn // eslint-disable-line no-undef, no-native-reassign, no-global-assign

utils.normalize = function normalize (filepath, locals, opts, cb) {
  var contents = null

  if (typeof filepath === 'object') {
    var file = filepath
    filepath = file.path
    contents = file.contents || null
  }
  if (typeof filepath !== 'string') {
    var msg = 'expect `filepath` to be a string or object with `path` prop'
    throw new TypeError(msg)
  }
  if (typeof locals !== 'object') {
    throw new TypeError('expect `locals` to be an object')
  }
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }

  opts = utils.extend({
    cwd: process.cwd(),
    encoding: 'utf-8',
    sync: false
  }, opts)
  filepath = path.resolve(opts.cwd, filepath)
  contents = utils.isBuffer(contents)
    ? contents.toString(opts.encoding)
    : (typeof contents === 'string' ? contents : null)

  var isAsync = opts.sync === false && typeof cb === 'function'

  return {
    path: filepath,
    contents: contents && contents.length ? contents : null,
    locals: locals,
    options: opts,
    isAsync: isAsync,
    callback: isAsync ? cb : null
  }
}

utils.readFile = function readFile (fp, opts, cb) {
  if (typeof cb === 'function') {
    fs.readFile(fp, opts.encoding, cb)
    return
  }
  var contents = null
  try {
    contents = fs.readFileSync(fp, opts.encoding)
  } catch (e) {
    contents = null
  }
  return contents
}

/**
 * Expose `utils` modules
 */

module.exports = utils
