'use strict'

var utils = require('./lib')

function Vist (engine, plugin) {
  if (!(this instanceof Vist)) {
    return new Vist(engine, plugin)
  }
  utils.delegate(this, utils.methods)
  // @use `consolide`
  this.factory = consolide(engine, plugin).bind(this)
}

function consolide (engine, plugin) {
  return function render (template, data, cb) {
    if (typeof template === 'object') {
      template = template.contents
    }
    if (typeof template !== 'string') {
      throw new TypeError('expect `template` to be a string')
    }
    if (typeof data === 'function') {
      cb = data
    }
    if (typeof data === 'object') {
      return compileFn(data, cb)
    }
    return compileFn

    function compileFn (locals, callback) {
      if (typeof locals !== 'object') {
        throw new TypeError('expect `locals` to be an object')
      }
      cb = callback || cb
      cb = typeof cb === 'function' ? cb : null
      plugin = typeof plugin === 'function'
        ? plugin
        : defaultPlugin
      return plugin.call(engine, template, locals, cb)
    }
  }
}

function defaultPlugin (tpl, loc, done) {
  var res = null
  res = this.compile
    ? this.compile(tpl)(loc)
    : (this.render ? this.render(tpl, loc) : null)

  return done ? done(null, res) : res
}

module.exports = function create (engine, plugin) {
  return new Vist(engine, plugin)
}
