'use strict'

// var forIn = require('for-in')
var matcher = require('is-match')

function objectFilter (obj, filter, opts) {
  opts = typeof opts === 'object' ? opts : {}

  var res = {}
  var isMatch = matcher(filter, opts)
  var keys = Object.keys(obj)
  var len = keys.length
  var i = 0

  while (i < len) {
    var key = keys[i++]
    var val = obj[key]

    if (opts.values && !isMatch(val)) {
      continue
    }
    if (opts.keys && !isMatch(key)) {
      continue
    }
    if (!isMatch(val) && !isMatch(key)) {
      continue
    }
    res[key] = val
  }

  return res
}

var obj = {
  'foo': 'bar',
  'fos': 'koa',
  'faz': 'far',
  'boo': 'abc',
  'data': 'foo'
}

console.log(objectFilter(obj, 'f*'))
//=> { foo: 'bar', fos: 'koa', faz: 'far', data: 'foo' }

console.log(objectFilter(obj, 'f*', {keys: true}))
//=> { foo: 'bar', fos: 'koa', faz: 'far' }

console.log(objectFilter(obj, 'f*', {values: true}))
//=> { faz: 'far', data: 'foo' }

console.log(objectFilter(obj, '*a'))
//=> { fos: 'koa', data: 'foo' }

console.log(objectFilter(obj, ['*oo', '!f*']))
//=> { boo: 'abc' }

console.log(objectFilter(obj, '*oo', {keys: true}))
//=> { foo: 'bar', boo: 'abc' }

console.log(objectFilter(obj, '*oo', {values: true}))
//=> { data: 'foo' }

console.log(objectFilter(obj, '*o*', {values: true}))
//=> { fos: 'koa', data: 'foo' }
