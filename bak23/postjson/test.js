/*!
 * postjson <https://github.com/tunnckoCore/postjson>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released uninputder the MIT license.
 */

'use strict'

var fs = require('fs')
var tokenize = require('./tokenizer')
var pkgJson = fs.readFileSync('./package.json', 'utf8')
// var tokens = tokenize(pkgJson)

// console.log(tokens)


// // var test = require('mukla')
var postjson = require('./index')
var utils = require('./utils')

postjson
  .use(function treeApi (app) {
    // `this.walk` or `app.walk`, both work
    app.define('walk', function (tree, fn) {
      utils.arrayify(tree).forEach(function (node) {
        if (utils.isArray(node)) return app.walk(node, fn)
        fn(node)
      })
      return app
    })
  })
  .use(function (app) {
    return function (ast) {
      // `this.walk` or `app.walk`, both work
      app.walk(ast.tree, function (node) {
        if (node.key === 'license') node.value = 'Apache332'
        if (node.key === 'files') {
          app.walk(node.value, function (file) {
            // console.log('file:', file)
          })
        }
        // console.log(node)
      })
    }
  })

var app = postjson.process(require('./package.json'))

// console.log(app.toString(2))          // modified indented with JSON.stringify
// console.log(app.cache.input)          // incoming value, not modified but parsed JSON object
// console.log(app.cache.input.license)  // MIT
// console.log(app.cache.json)           // modified JSON object
// console.log(app.cache.json.license)   // Apache332
// console.log(app.cache.ast.tree)

// var pkg = require('./package.json')

// utils.forOwn(pkg, function fn (value, key) {
//   if (utils.isObject(value)) {
//     utils.forOwn(value, fn)
//     return
//   }
//   // @todo???
//   // if (utils.isArray(value)) {
//   //   value.forEach(function (val, i) {
//   //     console.log('key:', key + '.' + i) // files.0; files.1 and etc for example
//   //     console.log('val:', val)
//   //   })
//   //   return
//   // }
//   plugin(value, key, pkg)
// })

// function plugin (val, key) {
//   console.log('key:', key)
//   console.log('val:', val)
// }

// var fs = require('fs')
// var limon = require('limon')
// var prevNext = require('limon-prev-next')

// limon
//   .use(prevNext())
//   .use(function plugin (app) {
//     return function (ch, i, input) {
//       app.match = function match (re) {
//         return re.test(ch) ? ch : null
//       }
//       app.token = function token (name, re) {
//         var m = app.match(re)
//         if (!m) return false
//         app.current = [name, ch, i, i + 1]
//         app.tokens.push(app.current)
//         return true
//       }
//     }
//   })
//   .use(function parseTokenPlugin (app) {
//     app.parseToken = function parseToken (i) {
//       var token = app.tokens[i]
//       return token ? {
//         type: token[0],
//         value: token[1],
//         start: token[2],
//         end: token[3],
//         next: app.parseToken(i + 1)
//       } : {}
//     }
//     app.parseTokens = function parseTokens (fn, done) {
//       var len = app.tokens.length
//       var i = 0

//       while (i < len) {
//         var token = app.parseToken(i++)
//         fn.call(app, token, i - 1, app.tokens)
//         if (i === len) {
//           done.call(app, app)
//         }
//       }
//     }
//   })
//   .use(function simple (app) {
//     return function (ch, i, input) {
//       // console.log('prev is:', this.prev())
//       // console.log('next is:', this.next())

//       app.token('whitespace', /\s/) ||
//       app.token('symbol', /\W/) ||
//       app.token('digit', /\d/) ||
//       app.token('letter', /[^\s\W\d]/)
//       // if (/\s/.test(ch)) {
//       //   this.tokens.push(['whitespace', ch, i])
//       //   return
//       // }
//       // if (/\W/.test(ch)) {
//       //   this.tokens.push(['symbol', ch, i])
//       //   return
//       // }
//       // if (/\d/.test(ch)) {
//       //   this.tokens.push(['digit', ch, i])
//       //   return
//       // }
//       // this.tokens.push(['letter', ch, i])
//     }
//   })

// var pkg = fs.readFileSync('./package.json', 'utf8')

// limon.tokenize(pkg)
// limon.string = ''
// limon.strings = []
// limon.parseTokens(function (token, i) {
//   var ch = token.value
//   if (token.start === 0 && token.type !== 'symbol' && (ch !== '{' || ch !== '[')) {
//     throw new Error('expect valid json string on strict mode')
//   }
//   if (token.type === 'letter') this.string += ch
//   if (token.type === 'letter' && token.next.type !== 'letter') {
//     this.strings.push([this.string])
//   }
//   if (token.type === 'letter' && token.next.type === 'symbol' && token.next.value === '"') {
//     this.strings.push(this.string)
//     this.string = ''
//   }
//   // var isBackslash = ch.charCodeAt(0) === 92
//   // var nextVal = token.next.value === '"'

//   // if (token.type === 'letter' && isBackslash) {
//   //   console.log('asa!s')
//   // }

// }, function done (app) {
//   console.log(limon.strings)
// })

