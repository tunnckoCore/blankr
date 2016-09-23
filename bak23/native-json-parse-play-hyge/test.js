/*!
 * hyge <https://github.com/tunnckoCore/hyge>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

// var test = require('mukla')
// var hyge = require('./index')

// test('hyge:', function (done) {
//   // body
//   done()
// })

var fs = require('fs')
var kindOf = require('kind-of')
var json = fs.readFileSync('./package.json', 'utf8')

// if (json.charAt(0) !== '{' && json.charAt(0) !== '[') {
//   throw new TypeError('expect valid json string starting with `[` or `{`.')
// }

// var documentType = json.charAt(0) === '{' ? 'object' : 'array'
// var ast = {
//   type: documentType,
//   value: []
// }
// var temp = []

// JSON.parse(json, function (key, value) {
//   if (key === '') {
//     return value
//   }
//   // if (documentType === 'object') {
//   //   ast.value.push({
//   //     type: 'property',
//   //     key: {
//   //       type: 'key',
//   //       value: key,
//   //       position: {}
//   //     },
//   //     value: {
//   //       type: typeOf(value),
//   //       value: value,
//   //       position: {}
//   //     }
//   //   })
//   //   var last = ast.value[ast.value.length]
//   //   if (last.key.type === 'key' && last.key.value === '0') {
//   //     ast.value.length = ast.value.length - 1
//   //     temp.push({
//   //     type: 'item',
//   //     key: {
//   //       type: 'key',
//   //       value: key,
//   //       position: {}
//   //     },
//   //     value: {
//   //       type: typeOf(value),
//   //       value: value,
//   //       position: {}
//   //     }
//   //   })
//   //   }
//   // }
//   // console.log(key, value)

//   // ast.content.content.push({
//   //   type: '',
//   //   key: key,
//   //   value: value
//   // })

//   return value
// })

// console.log(ast.value)

/**
 * OLDONE
 */
// var json2ast = require('json-to-ast')
// var json = `[{
//   "foo": "bar baz",
//   "scripts": {
//     "test": "standard && node test.js",
//     "qux": "zzz",
//     "nested": {
//       "rules": "okey",
//       "or": "not okey"
//     },
//     "nested2": {
//       "rules2": "ok3333ey",
//       "or2222": "not 222okey"
//     }
//   },
//   "xx": true,
//   "some arr": [1, "foo", true, "bar"],
//   "data": "base yeah!"
// }, {
//   "baby": "somewhere there",
//   "abc": 7
// }, [
//   111, "fo222ba", 333
// ]]
// `

// console.log(json2ast(json).items[0])

/**
 * custom JSON2 - reviver patch
 */

// simple json object
// {
//   "bool": true,
//   "num": 123
// }
//
// =>
{
  type: 'object',
  contents: [{
    type: 'property',
    key: {type: 'string', contents: 'bool'},
    value: {type: 'boolean', contents: true},
    contents: [
      {type: 'key', contents: 'bool'},
      {type: 'value', contents: true}
    ]
  }, {
    type: 'property',
    key: {type: 'string', contents: 'num'},
    value: {type: 'number', contents: 123},
    contents: [
      {type: 'key', contents: 'num'},
      {type: 'value', contents: 123}
    ]
  }]
}

// nested json object (package.json-ish)
{
  "name": "pkg-name",
  "files": [
    666,
    "index.js",
    true,
    [false, "nested1", 2222, null]
    null,
  ],
  "private": true,
  "dependencies": {
    "gulp": "^3.9.0",
    "base": false,
    "nested": {
      "obj": "here",
      "and": null,
      "arr": [675, null, true, ["44", null, 555, false], 11, "999"]
      "bar": 456,
    },
    "num": 777,
    "qux": null,
    "keywords": [false, "fxoo", 888, "bxar", null]
  },
  "foo": 123,
  "some": null
}

// results in
// =>
{
  type: 'object',
  contents: [{
    type: 'property',
    key: {type: 'string', contents: 'name'},
    value: {type: 'string', contents: 'pkg-name'},
    contents: [
      {type: 'key', contents: 'name'},
      {type: 'value', contents: 'pkg-name'}
    ]
  }, {
    type: 'property',
    key: {type: 'string', contents: 'files'},
    value: {
      type: 'array', contents: [{
        type: 'item',
        key: {type: 'number', contents: 0},
        value: {type: 'number', contents: 666}
        contents: [
          {type: 'key', contents: 0},
          {type: 'value', contents: 666}
        ]
      }, {
        type: 'item',
        key: {type: 'number', contents: 1},
        value: {type: 'string', contents: 'index.js'}
        contents: [
          {type: 'key', contents: 1},
          {type: 'value', contents: 'index.js'}
        ]
      }, {
        type: 'item',
        key: {type: 'number', contents: 2},
        value: {type: 'boolean', contents: true}
        contents: [
          {type: 'key', contents: 2},
          {type: 'value', contents: true}
        ]
      }, {
        type: 'item',
        key: {type: 'number', contents: 3},
        value: {type: 'array', contents: [{
          type: 'item',
          key: {type: 'number', contents: 0},
          value: {type: 'boolean', contents: false},
          contents: [
            {type: 'key', contents: 0},
            {type: 'value', contents: false}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 1},
          value: {type: 'string', contents: 'nested1'},
          contents: [
            {type: 'key', contents: 1},
            {type: 'value', contents: 'nested1'}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 2},
          value: {type: 'number', contents: 2222},
          contents: [
            {type: 'key', contents: 2},
            {type: 'value', contents: 2222}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 3},
          value: {type: 'null', contents: null},
          contents: [
            {type: 'key', contents: 3},
            {type: 'value', contents: null}
          ]
        }]}
        contents: [
          {type: 'key', contents: 3},
          {type: 'value', contents: [/* same as `value.contents` array */]}
        ]
      }, {
        type: 'item',
        key: {type: 'number', contents: 4},
        value: {type: 'null', contents: null}
        contents: [
          {type: 'key', contents: 4},
          {type: 'value', contents: null}
        ]
      }]
    },
    contents: [
      {type: 'key', contents: 'files'},
      {type: 'value', contents: [/* same as `value.contents` array */]}
    ]
  }, {
    type: 'property',
    key: {type: 'string', contents: 'private'},
    value: {type: 'boolean', contents: true},
    contents: [
      {type: 'key', contents: 'private'},
      {type: 'value', contents: true}
    ]
  }, {
    type: 'property',
    key: {type: 'string', contents: 'dependencies'},
    value: {
      type: 'object',
      contents: [{
        type: 'property',
        key: {type: 'string', contents: 'gulp'},
        value: {type: 'string', contents: '^3.9.0'},
        contents: [
          {type: 'key', contents: 'gulp'},
          {type: 'value', contents: '^3.9.0'}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'base'},
        value: {type: 'boolean', contents: false},
        contents: [
          {type: 'key', contents: 'base'},
          {type: 'value', contents: false}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'nested'},
        value: {
          type: 'object',
          contents: [{
            type: 'property',
            key: {type: 'string', contents: 'obj'},
            value: {type: 'string', contents: 'here'},
            contents: [
              {type: 'key', contents: 'obj'},
              {type: 'value', contents: 'here'}
            ]
          }, {
            type: 'property',
            key: {type: 'string', contents: 'and'},
            value: {type: 'null', contents: null},
            contents: [
              {type: 'key', contents: 'and'},
              {type: 'value', contents: null}
            ]
          }, {
            type: 'property',
            key: {type: 'string', contents: 'array'},
            value: {type: 'array', contents: [{
              type: 'item',
              key: {type: 'number', contents: 0},
              value: {type: 'number', contents: 675},
              contents: [
                {type: 'key', contents: 0},
                {type: 'value', contents: 675}
              ]
            }, {
              type: 'item',
              key: {type: 'number', contents: 1},
              value: {type: 'null', contents: null},
              contents: [
                {type: 'key', contents: 1},
                {type: 'value', contents: null}
              ]
            }, {
              type: 'item',
              key: {type: 'number', contents: 2},
              value: {type: 'boolean', contents: true},
              contents: [
                {type: 'key', contents: 2},
                {type: 'value', contents: true}
              ]
            }, {
              type: 'item',
              key: {type: 'number', contents: 3},
              value: {type: 'array', contents: /*["44", null, 555, false]*/ [{
                type: 'item',
                key: {type: 'number', contents: 0},
                value: {type: 'string', contents: '44'},
                contents: [
                  {type: 'key', contents: 0},
                  {type: 'value', contents: '44'}
                ]
              }, {
                type: 'item',
                key: {type: 'number', contents: 1},
                value: {type: 'null', contents: null},
                contents: [
                  {type: 'key', contents: 1},
                  {type: 'value', contents: null}
                ]
              }, {
                type: 'item',
                key: {type: 'number', contents: 2},
                value: {type: 'number', contents: 555},
                contents: [
                  {type: 'key', contents: 2},
                  {type: 'value', contents: 555}
                ]
              }, {
                type: 'item',
                key: {type: 'number', contents: 3},
                value: {type: 'boolean', contents: false},
                contents: [
                  {type: 'key', contents: 3},
                  {type: 'value', contents: false}
                ]
              }]},
              contents: [
                {type: 'key', contents: 3},
                {type: 'value', contents: [/* same as `value.contents` array */]}
              ]
            }, {
              type: 'item',
              key: {type: 'number', contents: 4},
              value: {type: 'number', contents: 11},
              contents: [
                {type: 'key', contents: 4},
                {type: 'value', contents: 11}
              ]
            } ]},
            contents: [
              {type: 'key', contents: 'array'},
              {type: 'value', contents: [/* same as `value.contents` array */]}
            ]
          }, {
            type: 'property',
            key: {type: 'string', contents: 'bar'},
            value: {type: 'number', contents: 456},
            contents: [
              {type: 'key', contents: 'bar'},
              {type: 'value', contents: 456}
            ]
          }]
        },
        contents: [
          {type: 'key', contents: 'nested'},
          {type: 'value', contents: [/* same as `value.contents` array */]}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'num'},
        value: {type: 'number', contents: 777},
        contents: [
          {type: 'key', contents: 'num'},
          {type: 'value', contents: 777}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'qux'},
        value: {type: 'null', contents: null},
        contents: [
          {type: 'key', contents: 'qux'},
          {type: 'value', contents: null}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'keywords'},
        value: {type: 'array', contents: /*[false, "fxoo", 888, "bxar", null]*/[{
          type: 'item',
          key: {type: 'number', contents: 0},
          value: {type: 'boolean', contents: false},
          contents: [
            {type: 'key', contents: 0},
            {type: 'value', contents: false}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 1},
          value: {type: 'string', contents: 'fxoo'},
          contents: [
            {type: 'key', contents: 1},
            {type: 'value', contents: 'fxoo'}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 2},
          value: {type: 'number', contents: 888},
          contents: [
            {type: 'key', contents: 2},
            {type: 'value', contents: 888}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 3},
          value: {type: 'string', contents: 'bxar'},
          contents: [
            {type: 'key', contents: 3},
            {type: 'value', contents: 'bxar'}
          ]
        }, {
          type: 'item',
          key: {type: 'number', contents: 4},
          value: {type: 'null', contents: null},
          contents: [
            {type: 'key', contents: 4},
            {type: 'value', contents: null}
          ]
        }]},
        contents: [
          {type: 'key', contents: 'keywords'},
          {type: 'value', contents: [/* same as `value.contents` array */]}
        ]
      }]
    },
    contents: [
      {type: 'key', contents: 'dependencies'},
      {type: 'value', contents: [/* same as `value.contents` array */]}
    ]
  }, {
    type: 'property',
    key: {type: 'string', contents: 'foo'},
    value: {type: 'number', contents: 123},
    contents: [
      {type: 'key', contents: 'foo'},
      {type: 'value', contents: 123}
    ]
  }, {
    type: 'property',
    key: {type: 'string', contents: 'some'},
    value: {type: 'null', contents: null},
    contents: [
      {type: 'key', contents: 'some'},
      {type: 'value', contents: null}
    ]
  }]
}


// json array
// [
//   "foo",
//   123,
//   "bar",
//   null,
//   {
//     "aaa": "bbb",
//     "ccc": true,
//     "ddd": {
//       "xxx": "yyy",
//       "zzz": 1122
//     }
//   }
//   true
// ]
//
// =>
{
  type: 'array',
  contents: [ {
    type: 'item',
    key: {type: 'number', contents: 0},
    value: {type: 'string', contents: "foo"},
    contents: [
      {type: 'key', contents: 0},
      {type: 'value', contents: "foo"}
    ]
  }, {
    type: 'item',
    key: {type: 'number', contents: 1/* `position` is same as the `.value.position` */},
    value: {type: 'number', contents: 123},
    contents: [
      {type: 'key', contents: 1/* `position` is same as the `.value.position` */},
      {type: 'value', contents: 123}
    ]
  }, {
    type: 'item',
    key: {type: 'number', contents: 2},
    value: {type: 'string', contents: "bar"},
    contents: [
      {type: 'key', contents: 2},
      {type: 'value', contents: "bar"}
    ]
  }, {
    type: 'item',
    key: {type: 'number', contents: 3},
    value: {type: 'null', contents: null},
    contents: [
      {type: 'key', contents: 3},
      {type: 'value', contents: null}
    ]
  }, {
    type: 'item',
    key: {type: 'number', contents: 4},
    value: {
      type: 'object',
      contents: [{
        type: 'property',
        key: {type: 'string', contents: 'aaa'},
        value: {type: 'string', contents: 'bbb'},
        contents: [
          {type: 'key', contents: 'aaa'},
          {type: 'value', contents: 'bbb'}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'ccc'},
        value: {type: 'boolean', contents: true},
        contents: [
          {type: 'key', contents: 'ccc'},
          {type: 'value', contents: true}
        ]
      }, {
        type: 'property',
        key: {type: 'string', contents: 'ddd'},
        value: {
          type: 'object',
          contents: [{
            type: 'property',
            key: {type: 'string', contents: 'xxx'},
            value: {type: 'string', contents: 'yyy'},
            contents: [
              {type: 'key', contents: 'xxx'},
              {type: 'value', contents: 'yyy'}
            ]
          }, {
            type: 'property',
            key: {type: 'string', contents: 'zzz'},
            value: {type: 'number', contents: 1122},
            contents: [
              {type: 'key', contents: 'zzz'},
              {type: 'value', contents: 1122}
            ]
          }]
        },
        contents: [
          {type: 'key', contents: 'ddd'},
          {type: 'value', contents: [/* same as `value.contents` array */]}
        ]
      }]
    },
    contents: [
      {type: 'key', contents: 4},
      {type: 'value', contents: [/* same as `value.contents` array */]}
    ]
  }, {
    type: 'item',
    key: {type: 'number', contents: 5},
    value: {type: 'boolean', contents: true},
    contents: [
      {type: 'key', contents: 5},
      {type: 'value', contents: true}
    ]
  }]
}

/**
 * implementation
 */

// var mark = false
// var AST = {}
// var isNumber = require('is-number')
// var _JSONparse = require('./JSON-js/json_parse')
// _JSONparse(json, function (val, key, obj, at) {
//   var keyType = kindOf(key)
//   var valType = kindOf(val)

//   if (!mark && keyType === 'number') {
//     AST.type = 'array'
//     AST.contents = []
//   }
//   if (!mark && keyType !== 'number') {
//     AST.type = 'object'
//     AST.contents = []
//   }

//   mark = true

//   if (keyType === 'number' && (valType === 'object' || valType === 'array')) {
//     AST.contents.push({
//       type: valType,
//       contents: [] // @todo
//     })
//     return
//   }
//   var len = AST.contents.length
//   var last = AST.contents[len - 1]
//   if (last) {
//     last.contents.push({
//       type: valType,
//       contents: [{
//         type: 'key',
//         value: key
//       }, {
//         type: 'value',
//         value: val
//       }]
//     })
//   }
//   // console.log('key:', key, ', val:', val, 'at:', at)
//   // console.log('====')
// })

// console.log(AST.contents[2].contents[0])

/**
 * @foo @bar
 */

// @done: https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
// @done: Lines 341-350 for the walker/reviver...
// @done: walk() from 343, before 341
//
// @learn more: https://github.com/finnp/json-lexer/blob/master/index.js
// @learn lex(), get() and update(): https://github.com/bestiejs/json3/blob/master/lib/json3.js

// var glob = require('glob-object')
// var json3 = require('json3')
// JSON.parse(json, function (key, value) {
//   if (key === '') return
//   console.log(this, key, value)
//   var res = glob('*.' + key, tmp[tmp.length - 1]) // @todo, almost.
//   tmp.push(this) // @todo
//   console.log('>>', res)
//   console.log('====')
// })

// console.log(glob('*.test', JSON.parse(json)))

// has(prev, '*.' + key)

// =>
// foo bar baz
// test standard && node test.js
// qux zzz
// rules okey
// or not okey
// nested {}
// scripts {}
// xx true

// var tokens = []
// var obj = JSON.parse(json)
// JSON.parse(json, function (key, value) {
//   if (key === '') return
//   if (typeof value === 'object') {
//     console.log(key)
//     var len = tokens.length - Object.keys(obj[key]).length
//     var toks = tokens.slice(len)
//     tokens.length = len
//     var t = {}
//     toks.forEach(function (tok) {
//       t[tok[0]] = tok[1]
//     })
//     tokens.push([key, t])
//     return
//   }
//   tokens.push([key, value])
// })
// console.log(tokens)
// =>
// foo bar baz
// test standard && node test.js
// qux zzz
// scripts {}
// xx true

// var lexer = require('json-lexer')
// var tokens = lexer(json).filter(function (token) {
//   return token.type !== 'whitespace'
// })
// var ast = []


// var isOpen = false
// var openCurly = 0
// var len = tokens.length
// var i = -1

// while (i++ < len) {
//   decl(i)

//   function decl (idx) {
//     var token = tokens[idx] || {}

//     if (token.type === 'punctuator' && token.value === '{') {
//       openCurly++
//       isOpen = openCurly > 1 ? true : false
//       continue
//     }
//     if (token.type === 'punctuator' && token.value === '}') {
//       isOpen = false
//       continue
//     }

//     var prev = tokens[idx - 1] || {}
//     var next = tokens[idx + 1] || {}

//     if (
//       (prev.type === 'string') &&
//       (token.type === 'punctuator' && token.value === ':') &&
//       (next.value !== '{' && next.value !== '[')
//     ) {
//       if (!isOpen) {
//         ast.push({
//           type: 'property',
//           key: {
//             type: 'key',
//             value: prev.value
//           },
//           value: {
//             type: typeof next.value,
//             value: next.value
//           }
//         })
//       }
//     }
//     if (token.type === 'punctuator' && (token.value === '{' || token.value === '[')) {

//     }
//   }
// }

// console.log(ast)


// function decl (token, i) {
//   var prev = tokens[i - 1]
//   var next = tokens[i + 1]
//   var after = tokens[i + 2]
//   if (
//     token.type === 'punctuator' &&
//     token.value === ':' &&
//     prev.type === 'string' &&
//     (next.type === 'whitespace' || next.type === 'string' || next.type === 'literal')
//   ) {
//     var nextToken = next.type === 'whitespace' ? after : next
//     if (nextToken.type === 'punctuator' && nextToken.value === '{') {
//       decl()
//       return
//     }
//     ast.push({
//       type: 'property',
//       key: {
//         type: 'key',
//         value: prev.value
//       },
//       value: {
//         type: typeof nextToken.value,
//         value: nextToken.value
//       }
//     })
//   }
// }
