/*!
 * asia <https://github.com/tunnckoCore/asia>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

function Asia (options) {
  if (!(this instanceof Asia)) {
    return new Asia(options)
  }

  this.options = utils.extend({
    settle: true,
    serial: false,
    letta: utils.letta,
    context: this
  }, options)
  this.tests = utils.arrayify(this.options.tests)
  utils.ctrl.AsyncControl.call(this, this.options)
}
utils.ctrl.AsyncControl.extend(Asia)

Asia.prototype.option = function option (key, value) {
  if (utils.isObject(key)) {
    this.options = utils.extend({}, this.options, key)
    return this
  }
  utils.set(this.options, key, value)
  return this
}

Asia.prototype.addReporter = function addReporter (reporter, options) {
  if (typeof reporter !== 'function') {
    throw new TypeError('.addReporter: expect `reporter` to be a function')
  }
  this.options = utils.extend({}, this.options, options)
  reporter.call(this, this, this.options)
  this.reporterCalled = true
  return this
}

Asia.prototype.addTest = function addTest (title, fn, options) {
  if (typeof title === 'function') {
    fn = title
    title = utils.getName(fn) || 'anonymous'
  }
  if (typeof fn !== 'function') {
    throw new TypeError('.addTest: expect `fn` to be a function')
  }

  this.options = utils.extend({}, this.options, options)
  fn.index = this.tests.length + 1
  fn.title = title
  fn.test = fn
  this.tests.push(fn)
  return this
}

Asia.prototype.runTests = function runTests (options, done) {
  if (typeof options === 'function') {
    done = options
    options = {}
  }

  this.options = utils.extend({}, this.options, options)
  var reporter = typeof this.options.reporter === 'function'
    ? this.options.reporter
    : defaultReporter

  if (!this.reporterCalled) {
    this.addReporter(reporter)
  }

  var flow = this.options.serial ? this.series : this.parallel
  flow(this.tests, this.options, done)
}

function defaultReporter (app) {
  var self = this || app
  self
    .on('afterEach', function (err, res, fn) {
      if (!err) self.emit('pass', fn, res)
    })
    .on('error', function (err, res, fn) {
      self.emit('fail', fn, err)
    })
    .on('pass', function (fn) {
      console.log('ok #' + fn.index, fn.title)
    })
    .on('fail', function (fn, err) {
      console.error('not ok #' + fn.index, fn.title, '>>', err.message)
    })
}

module.exports = new Asia()
module.exports.Asia = Asia
