'use strict'

var ansiGreen = require('ansi-green')
var ansiRed = require('ansi-red')
var error = require('error-symbol')
var success = require('success-symbol')
var supportsColor = require('supports-color')

function identity (val) {
  return val
}

function red (val) {
  if (supportsColor) return ansiRed(val)
  return identity(val)
}

function green (val) {
  if (supportsColor) return ansiGreen(val)
  return identity(val)
}

function resolve () {
  var args = [].slice.call(arguments)
  console.log.apply(console, [green(success)].concat(args))
}

function reject () {
  var args = [].slice.call(arguments)
  console.error.apply(console, [red(error)].concat(args))
}

function log (err, res) {
  if (err) return reject('err:', err.message)
  resolve('err:', err + ', res:', res)
}


var then = require('then-callback')
var tryCatch = require('try-catch-core')
var isPromise = require('is-promise')
var isNodeStream = require('is-node-stream')
var isTypeofError = require('is-typeof-error')
var isChildProcess = require('is-child-process')

function alwaysCallback (fn, cb) {
  if (typeof cb !== 'function') {
    return function thunk (done) {
      alwaysCallback(fn, done)
    }
  }
  tryCatch(fn, doneCallback(cb))
}

function doneCallback (cb) {
  return function done (err, val) {
    if (err) {
      cb(err)
      return
    }

    // Raw return err like:
    // `return new Error('foo')`
    if (isTypeofError(val)) {
      cb(val)
      return
    }

    // nesting (??)
    if (typeof val === 'function') {
      alwaysCallback(val, cb)
      return
    }

    // Promises
    if (isPromise(val)) {
      // may need wrap `cb` with
      // dezalgo and once?
      then(val).then(cb)
      return
    }

    // Observables
    if (val && typeof val.subscribe === 'function') {
      if (val.value) {
        cb(null, val.value)
        return
      }
      val.subscribe(function noop () {}, cb, function onComplete () {
        var args = [].slice.call(arguments)
        cb.apply(null, [null].concat(args))
      })
      return
    }

    // Streams / Child Processes
    if (isNodeStream(val) || isChildProcess(val)) {
      // @todo
      return
    }

    // Synchronous
    cb(null, val)
  }
}

/**
 * EXAMPLES
 */

var fs = require('fs')

// simple sync
alwaysCallback(function () {
  return 'sync 123'
}, log)

// simple sync returning Error
alwaysCallback(function () {
  return new Error('returns err')
}, log)

// sync throws ReferenceError
alwaysCallback(function () {
  quxasa
  return 'foo bar'
}, log)

// sync throws from fs.readFileSync
alwaysCallback(function () {
  fs.readFileSync('not-existing')
}, log)

// sync get res from fs.readFileSync
alwaysCallback(function () {
  return fs.readFileSync(__filename)
}, log)

// async throws from fs.readFile
alwaysCallback(function (done) {
  fs.readFile('not-existing-async', done)
}, log)

// async gets from fs.readFile
alwaysCallback(function (done) {
  fs.readFile(__filename, done)
}, log)

// resolved promise
alwaysCallback(function () {
  return Promise.resolve('promise 123')
}, log)

// rejected promise
alwaysCallback(function () {
  return Promise.reject(new Error('promise err 123'))
}, log)
