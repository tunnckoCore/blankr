'use strict'

var util = require('util')
var defineProp = require('define-property')
var Emitter = require('component-emitter')

function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function Loggy () {
  if (!(this instanceof Loggy)) {
    return new Loggy()
  }
  Emitter(this)
  this.styles = {}
  this.levels = [
    'debug',
    'info',
    'warn',
    'error',
    'success'
  ]
  this.style('info', function (val) {
    if (typeof val === 'string') {
      val = util.format.apply(null, arguments)
    }
  })

  // add built-ins
  this.levels.forEach(function (level) {
    if (hasOwn(this.styles, level)) {
      this.once(level, this.styles[level])
    }
    this.emitter(level)
  }, this)
}

util.inherits(Loggy, Emitter)

Loggy.prototype.emitter = function emitter (name, fn) {
  if (hasOwn(this, name)) return this // @todo

  fn = typeof fn === 'function' ? fn : this.emit.bind(this, name)
  defineProp(this, name, fn)

  return this
}

Loggy.prototype.style = function style (name, fn) {
  if (hasOwn(this.styles, name)) return this // @todo
  defineProp(this.styles, name, fn)

  return this
}

var log = new Loggy()

log.info('foo %s bar', 'qxu')
