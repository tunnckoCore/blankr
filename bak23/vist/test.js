'use strict'

var vist = require('./index')(require('vash'))
console.log(vist.compileFileSync({
  path: 'foo.txt',
  // contents: 'hello @model.name world!!!!'
})({name: 'bar'}))

// var vash = require('vash')

// var engine = wrapper(vash)
// var res = engine('foo @model.name baz', {
//   name: 'charlike'
// }, console.log)
// console.log(res)

// function wrapper (engine, plugin) {
//   return function render (template, data, cb) {
//     if (typeof template === 'object') {
//       template = template.contents
//     }
//     if (typeof template !== 'string') {
//       throw new TypeError('expect `template` to be a string')
//     }
//     if (typeof data === 'function') {
//       cb = data
//     }
//     if (typeof data === 'object') {
//       return compileFn(data, cb)
//     }
//     return compileFn

//     function compileFn (locals, callback) {
//       if (typeof locals !== 'object') {
//         throw new TypeError('expect `locals` to be an object')
//       }
//       cb = callback || cb
//       cb = typeof cb === 'function' ? cb : null
//       plugin = typeof plugin === 'function'
//         ? plugin
//         : function defaultPlugin (tpl, loc, done) {
//           var res = null
//           res = this.compile
//             ? this.compile(tpl)(loc)
//             : (this.render ? this.render(tpl, loc) : null)

//           if (!done) {
//             return res
//           }
//           return done(null, res)
//         }
//       return plugin.call(engine, template, locals, cb)
//     }
//   }
// }

function es6template (template, data, cb) {
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

    var keys = []
    var values = []

    for (var key in locals) {
      keys.push(key)
      values.push(locals[key])
    }

    /* eslint-disable */
    var fn = new Function(keys, 'return `' + template + '`')
    var res = null
    /* eslint-enable */

    try {
      res = fn.apply(null, values)
    } catch (err) {
      err._template = template

      if (!cb) throw err
      return cb(err)
    }

    return cb ? cb(null, res) : res
  }
}

// es6template.render = function render (template, locals, cb) {
//   if (arguments.length < 2) {
//     throw new TypeError('.render: expect at least 2 arguments')
//   }
//   return es6template(template, locals, cb)
// }
// es6template.compile = function compile (template) {
//   return es6template(template)
// }

// // sync compile
// var fn = es6template('sync ${name}, compile!')
// console.log(fn({ name: 'qux' })) // => 'sync qux, compile!'

// // async compile
// var fn = es6template('compile ${name}, async!', function done (err, res) {
//   console.log(res) // => 'compile 123, async!'
// })
// fn({ name: 123 })

// // async compile 2
// var fn = es6template('compile ${name}, version 2~!')
// fn({ name: 'async' }, function done (err, res) {
//   console.log(res) // => 'compile ${name}, version 2~!'
// })

// // sync render
// var res = es6template('sync ${name}, render!', { name: 'fooqq' })
// console.log(res) // => 'sync fooqq, render!'

// // async render
// es6template('asynchronous ${name}, yeash!', {
//   name: 'render'
// }, function (err, res) {
//   console.log(res) // => 'asynchronous render, yeash!'
// })



// @works - only sync, throws on callback
// var res = vist.renderFileSync('foo.txt', {
//   name: 'Yasha',
//   awesome: 'pics'
// }, console.log)

// @works - sync and async
// var res = vist.renderFile('foo.txt', {
//   name: 'Yasha',
//   awesome: 'pics'
// }, console.log)

// @works
// vist.compileFile('foo.txt', function (err, fn) {
//   if (err) return console.error('ERR:', err)
//   var str = fn({
//     name: 'Charlike',
//     awesome: 'async'
//   })
//   console.log(str)
// })

// @works
// var fn = vist.compileFileSync('foo.txt')
// var str = fn({
//   name: 'Charlike',
//   awesome: 'sync'
// })
// console.log(str)

// @works - both `only path` (reads from fs)
// @works - and `path + contents string` (does not read from fs)
// @works - and `path + contents buffer` (does not read from fs)
// var fn = vist.compileFileSync({
//   path: 'foo.txt',
//   contents: 'woohoo ${name}, we have ${type} files support'
// })
// var str = fn({
//   name: 'Charlike',
//   type: 'vinyl'
// })
// console.log(str)

// @works - `.compile` as `.compileSync`
// var fn = vist.compile('hello ${world}, hihi!')
// console.log(fn({
//   world: 'Earth'
// }))

// @works - `.compile` async
// var fn = vist.compile('hello ${world}, hihi!', function (err, fn) {
//   if (err) return console.error('ERR:', err)
//   console.log(fn({
//     world: 'Earth'
//   }))
// })
