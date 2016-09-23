'use strict'

var fs = require('fs')
var use = require('use-ware')
var ctrl = require('async-control')
var extend = require('extend-shallow')

function Benz (options) {
  if (!(this instanceof Benz)) {
    return new Benz(options)
  }
  this.options = extend({
    params: [this, 123]
  }, this.options, options)
  use(this, this.options)
}

Benz.prototype.series = function series (done) {
  ctrl.series(this.fns, this.options, done)
  return this
}

var app = new Benz({settle: true, letta: require('letta')})

app
  .use(function one (app, base, done) {
    this.one = 'one'
    console.log('first:', this.one)
    fs.readFile('package.json', done)
  })
  .use(function two (app, base) {
    this.two = 'two'
    console.log('second:', this.two)
    console.log('args:', app, base) // => app instance, base instance
    // throw new Error('foo')
    return fs.readFileSync('not exist', 'utf8')
  })
  .use(function three (app, base) {
    this.three = 'three'
    console.log('third:', this.three)
    console.log('ctx:', this)
    console.log('args:', app, base) // => app instance, base instance
    return fs.statSync('package.json')
  })
  .use(function four (app, base) {
    return function (args) {
      return function (args) {
        return function (args) {
          return function (args) {
            console.log('actual', args)
          }
        }
      }
    }
  })
  .series(function (err, res) {
    console.log('ok', res)
  })

// ctrl
  // .on('before', function () {
  //   console.log('before all')
  // })
  // .on('beforeEach', function (fn, next) {
  //   console.log('before each:', fn.name)
  // })
  // .on('error', function (err, res) {
  //   console.log('on error:', err)
  // })
  // .on('afterEach', function (err, res, fn, next) {
  //   console.log('after each:', fn.name)
  // })
  // .on('after', function () {
  //   console.log('after all', this)
  // })
  // .series([
  // function one (app, base, done) {
  //   this.one = 'one'
  //   console.log('first:', this.one)
  //   fs.readFile('package.json', done)
  // },
  // function two (app, base) {
  //   this.two = 'two'
  //   console.log('second:', this.two)
  //   console.log('args:', app, base) // => app instance, base instance
  //   // throw new Error('foo')
  //   return fs.readFileSync('not exist', 'utf8')
  // },
  // function three (app, base) {
  //   this.three = 'three'
  //   console.log('third:', this.three)
  //   console.log('ctx:', this)
  //   console.log('args:', app, base) // => app instance, base instance
  //   return fs.statSync('package.json')
  // },
  // function four (app, base) {
  //   return function (args) {
      
  //   }
  // }
  // ], {
  //   settle: true,
  //   params: [{app: true}, {base: true}],
  //   context: {
  //     foo: 123
  //   }
  // }, function (err, res) {
  //   console.log('err:', err) // => ENOENT Error
  //   console.log('res:', res) // => [Buffer, undefined]
  //   console.log('done')
  // })