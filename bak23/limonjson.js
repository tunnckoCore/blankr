'use strict'

var fs = require('fs')
var utils = require('./utils')
var limon = require('limon')
var prevNextPlugin = require('limon-prev-next')
var tokenize = require('./postjson/tokenizer')
var Latin = require('parse-latin')

limon
  .use(prevNextPlugin())
  .use(function matcherPlugin (app) {
    return function (ch, i, input) {
      app.match = function match (re) {
        return re.test(ch) ? ch : null
      }
      app.token = function token (name, re) {
        var m = app.match(re)
        if (!m) return
        app.current = [name, ch, i, i + 1]
        app.tokens.push(app.current)
      }
    }
  })
  .use(function parseTokenPlugin (app) {
    app.parseToken = function parseToken (i) {
      var token = app.tokens[i]
      return token ? {
        type: token[0],
        value: token[1],
        position: {
          start: {
            line: token[4],
            offset: token[2]
          },
          end: {
            line: token[4],
            offset: token[3]
          }
        },
        next: app.parseToken(i + 1)
      } : {}
    }
    app.parseTokens = function parseTokens (fn, done) {
      var len = app.tokens.length
      var i = 0

      while (i < len) {
        var token = app.parseToken(i++)
        fn.call(app, token, i - 1, app.tokens)
        if (i === len) {
          done.call(app, app)
        }
      }
    }
  })
  .use(function simple (app) {
    return function (ch, i, input) {
      // console.log('prev is:', this.prev())
      // console.log('next is:', this.next())
      app.lineno = app.lineno || 1
      if (/\r?\n/.test(ch)) app.lineno++

      if (app.match(/\s/)) {
        if (app.first && app.word) {
          app.tokens.push(['word', app.word, app.first, i - 1, app.lineno])
          app.word = ''
        }

        app.current = ['whitespace', ch, i, i + 1, app.lineno]
        app.tokens.push(app.current)
        return
      }
      if (app.match(/\W/)) {
        app.current = ['symbol', ch, i, i + 1, app.lineno]
        app.tokens.push(app.current)
        return
      }
      app.first = app.first || i
      app.word = app.word || ''
      app.word += ch
      // app.current = ['letter', ch, i, i + 1, app.lineno]
      // app.tokens.push(app.current)
    }
  })

var pson = fs.readFileSync('./package.pson', 'utf8')
var json = fs.readFileSync('./strict-valid.json', 'utf8')
// var tokens = tokenize(pkg)
// var ast = {
//   type: 'document',
//   position: ''
// }
// tokens.forEach(function (token) {
//   console.log(token)
// })

// limon.tokenize(pkg)
// console.log(limon.tokens)
// limon.parseTokens(function (token, i) {
//   delete token.next
//   console.log(token)
// }, function done (app) {
//   console.log('end')
// })

// var latin = new Latin()
// console.log(latin.parse('foo bar baz'))


// var input = `foo: bar, baz: qux,
// 'qq-zz': beta str here, and-xz: "some : /:' here"`
// var parse = require('css-whitespace/lib/parser')
// var input = 'foo: bar\n'

// console.log(parse(pkg))

var snapdragon = require('snapdragon')
var renderer = new snapdragon.Renderer()
var parser = new snapdragon.Parser()
var tokens = []

console.log(tokenize(json))

/**
 * with internals (JSON.parse + plugin fn)
 */

function position (input, search) {
  return function (pos) {
    var startOffset = input.indexOf(String(search)) - 1
    var endOffset = startOffset + String(search).length
    return utils.extend({
      start: {
        line: 0,
        column: 0,
        offset: startOffset
      },
      end: {
        line: 0,
        column: 0,
        offset: endOffset
      }
    }, pos)
  }
}

function plugin (key, value) {
  var nodeKey = {
    type: 'key',
    content: key,
    value: value,
    position: position(json, key)()
  }
  var nodeValue = {
    type: 'value',
    content: value,
    key: key,
    position: position(json, value)()
  }

  tokens.push(nodeKey)
  tokens.push(nodeValue)
}
// var res = JSON.parse(json, function (key, val) {
//     var ret
//     if ('' === key) return val
//     // for (var i = 0, len = plugins.length; i < len; ++i) {
//       // plugin = plugins[i]
//       ret = plugin(key, val)
//       if (undefined != ret) val = ret
//     // }
//     return val
//   })
// tokens.forEach(function (node) {
//   console.log(node)
// })

// console.log('{  "name":'.slice(4, 8))

/**
 *significant json
 */

// var snapdragon = require('snapdragon')
// var renderer = new snapdragon.Renderer()
// var parser = new snapdragon.Parser()
//   .use(function colons () {
//     var pos = this.position();
//     var m = this.match(/^:/);
//     if (!m) return;
//     return pos({
//       type: 'colon',
//       val: m[0]
//     });
//   })
//   .use(function commas () {
//     var pos = this.position();
//     var m = this.match(/^,/);
//     if (!m) return;
//     return pos({
//       type: 'comma',
//       val: m[0]
//     });
//   })
//   .use(function space () {
//     var pos = this.position();
//     var m = this.match(/^ /);
//     if (!m) return;
//     return pos({
//       type: 'space',
//       val: m[0]
//     });
//   })
//   .use(function any () {
//     var pos = this.position();
//     var m = this.match(/^./);
//     if (!m) return;
//     return pos({
//       type: 'any',
//       val: m[0]
//     });
//   })
//   .use(function line () {
//     var pos = this.position();
//     var m = this.match(/^\r?\n/);
//     if (!m) return;
//     return pos({
//       type: 'line',
//       val: m[0]
//     });
//   })

// var ast = parser.parse('address: street,  cit/y,beta, state\nfoo bar: "ba:z qux"\n\naa:\n  bb: cc dd\n  ee: eee wee\nnested address:\n  obj: foo bar\n  location:\n    zip: 1437\n    city: "sofia, bulgaria"\n  state: true')
// // var ast = parser.parse('a/\\{{b,c,d}/e')
// // ast.nodes.forEach(function (node) {
// //   delete node.position
// //   console.log(node)
// // })

// renderer
//   .set('colon', function (node) {

//     return node.val
//   })
//   .set('comma', function (node) {return node.val})
//   .set('space', function (node) {return node.val})
//   .set('any', function (node) {
//     // console.log(this.nodes[this.nodes.length])
//     return node.val
//   })
//   .set('line', function (node) {return node.val})

// var res = renderer.render(ast)
// console.log(res.rendered)

/**
 * custom
 */

// var prev = null
// var next = null
// var key = ''
// var value = ''
// var colon = 0
// var line = 1
// var len = input.length
// var i = -1


// if (input[0] === '{' || input[0] === '[') i = 0
// if (input[len - 1] === '}' || input[len - 1] === ']') len = len - 2


// while (i++ < len) {
//   var ch = input[i]
//   prev = input[i - 1] || null
//   next = input[i + 1] || null
//   if (ch === ':') {
//     key = ''
//     colon = 0
//   }
//   console.log(prev, ch, next)
// }
