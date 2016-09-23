'use strict'

var util = require('util')
var expandArgs = require('expand-args')
var collectionVisit = require('collection-visit')
var Emitter = require('component-emitter')

function ListenArgs (options) {
  if (!(this instanceof ListenArgs)) {
    return new ListenArgs(options)
  }
  Emitter(this)
  this.options = options || {}
}

ListenArgs.prototype.expand = function expand (argv) {
  this.argv = expandArgs(argv)
  return this.argv
}

ListenArgs.prototype.listen = function listen (argv) {
  this.argv = this.argv || this.expand(argv)

  if (this.argv._ && this.argv._.length) {
    this.argv._.forEach(function (key, index) {
      this.emit(key, index)
    }, this)
    delete this.argv._
  }

  collectionVisit(this, 'emit', this.argv)
  return this
}

/**
 * MapArgs
 */

var async = require('async')
var expandArgs = require('expand-args')

function MapArgs (app, config) {
  if (!(this instanceof MapArgs)) {
    return new MapArgs(app, config)
  }
  if (typeof app !== 'object') {
    this._error('map-args: expect `app` to be an object')
  }
  this.app = app
  this.config = config && typeof config === 'object' ? config : {}
  this.aliases = {}
}

MapArgs.prototype.map = function map (key, val) {
  if (typeof key !== 'string') {
    throw new TypeError('.map: expect `key` to be a string')
  }
  if (typeof val === 'string') {
    return this.alias(val, key)
  }
  if (typeof val === 'function') {
    this.config[key] = val
    return this
  }
  this.config[key] = this.app[key]

  return this
}

MapArgs.prototype.alias = function alias (alias, key) {
  if (this.config.hasOwnProperty(key)) {
    this.config[alias] = this.config[key]
  } else {
    this.aliases[alias] = key
  }
  return this
}

MapArgs.prototype.process = function process_ (argv, callback) {
  this.argv = expandArgs(argv)
  callback = typeof callback === 'function'
    ? callback
    : function cb (err) {
      if (err) throw err
    }

  for (var key in this.aliases) {
    var alias = this.aliases[key]
    this.map(key, this.config[alias] || this.app[alias])
  }
  async.eachOfSeries(this.config, function (val, key, next) {
    if (typeof val !== 'function') {
      return next()
    }
    if (typeof val === 'function') {

    }
  }.bind(this))
  return this
}

var app = {
  set: function setMethod (val) {
    console.log('set method:', val)
  },
  get: function getMethod (val) {
    console.log('get method:', val)
  },
  del: function delMethod (val) {
    console.log('del method:', val)
  },
  qux: function quxMethod (val) {
    console.log('qux method:', val)
  },
  silent: function silent (bool) {
    console.log('silent?', bool)
  }
}
var cli = new MapArgs(app)

cli
  .on('beep', function (val) {
    console.log('onBeep:', val)
  })
  .on('silent', function (val) {
    console.log('onSilent:', val)
  })
  // all below works
  // .on('set', console.log)
  // .on('get', console.log)
  // .on('del', console.log)
  // .on('qux', console.log)
  // .on('bar', console.log)
  .map('set')
  .map('get')
  .map('del', function (val) {
    console.log('map del:', val)
  })
  .map('qux')
  .map('silent')
  .process([
    'qux',
    'bar',
    '--set=a:b,c:d',
    '--get=a',
    '--del=a,b,c',
    '--beep',
    '--no-silent'
  ])

