/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var test = require('./index')

/**
 * @TODO: works totally!
 * after removing 3 lines from `letta`
 */

// test.addReporter(function () {})
test({
  // before: function () {}
  // beforeEach: function () {}
  // afterEach: function () {}
  // after: function () {}
  serial: true
  // error: function () {}
  // reporter: function () {}
})

test(function one (done) {
  this.one = 'one'
  // console.log('first:', this.one)
  // throw new Error('foo')
  fs.readFile('package.json', done)
})

// should fail but countinue to next test
test(function two () {
  this.two = 'two'
  // console.log('second:', this.two)
  // console.log('args:', a, b, c) // => 1 2 3
  // throw new Error('foo')
  return fs.readFileSync('not exist', 'utf8')
})

test(function * gen () {
  return Promise.resolve(123)
})

test(function simplyPromise () {
  return Promise.resolve(9893)
})

test(function syncTest () {
  return 777
})

test(function syncDone () {
  return function (done) {
    done(null, [555, 23])
  }
})

test(function syncReturnPromise () {
  return function promise () {
    return Promise.resolve(555)
  }
})

// fails, currently
// should work after `letta` updates/fixes
test(function three (done) {
  this.three = 'three'
  // console.log('third:', this.three)
  // console.log('ctx:', this)
  // console.log('args:', a, b, c) // => 1 2 3
  fs.stat('./test.js', done)
})

test(function nested () {
  // console.log('this1:', this)
  return function nested2 () {
    // console.log('this2:', this)
    return function sync () {
      // console.log('this3:', this)
      // console.log('this.foo === 123?', this.foo === 123)
      return Promise.resolve([8,7,6])
    }
  }
})

test(function nesting () {
  return function foobar () {
    return function nestedCb () {
      return function cbak (done) {
        dsfsdf
        done(null, 123)
      }
    }
  }
})

test(function sasasa () {
  return function foobar () {
    return function nestedCb () {
      return function sync () {
        return 123
      }
    }
  }
})
