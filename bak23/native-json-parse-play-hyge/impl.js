'use strict'

// @learn: https://github.com/tildeio/simple-html-tokenizer
// inspiration: lib/evented-tokenizer

var isNumber = require('is-number')
var kindOf = require('kind-of')
var utils = require('lazy-utils')
var JSONparse = require('./JSON-js/json_parse')
var json2ast = require('json-to-ast')
var lexer = require('json-lexer')
var jju = require('jju')

// var input = `[
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
//   },
//   true,
//   [55, 66, 77]
//   "abc"
// ]`
var input = `{
  "name": "pkg-name",
  "files": [
    666,
    "index.js",
    true,
    [false, "nested1", 2222, null],
    null
  ],
  "private": true,
  "dependencies": {
    "gulp": "^3.9.0",
    "base": false,
    "nested": {
      "obj": "here",
      "and": null,
      "arr": [675, null, true, ["44", null, 555, false], 11, "999"],
      "bar": 456
    },
    "num": 777,
    "qux": null,
    "keywords": [false, "fxoo", 888, "bxar", null]
  },
  "foo": 123,
  "some": null
}`

console.log(json2ast(input))

/**
 * for kriso utre
 * https://youtu.be/vii_aEkB_1k?t=47m7s
 * impl.
 */

var mark = false
var AST = null

function createNode (name, node) {
  return utils.extend({type: name, contents: []}, node)
}

JSONparse(input, function fn (val, key, obj) {
  // console.log(key, val)
  // var keyType = kindOf(key)
  // var valType = kindOf(val)

  // if (!mark && keyType === 'number') {
  //   AST = createNode('array')
  // }
  // if (!mark && keyType !== 'number') {
  //   AST = createNode('object')
  // }

  // mark = true

  // if (!JSONparse.skipNext && (AST.type === 'object' || AST.type === 'array')) {
  //   var nodeType = AST.type === 'object' ? 'property' : 'item'
  //   var keyTypeNode = createNode(keyType, {contents: key})
  //   var valTypeNode = createNode(valType, {contents: val})
  //   // var valueNode = null
  //   AST.contents.push(createNode(nodeType, {
  //     key: keyTypeNode,
  //     value: valTypeNode,
  //     contents: [
  //       createNode('keyNode', {contents: key}),
  //       createNode('valueNode', {contents: val}),
  //     ]
  //   }))
  //   JSONparse.skipNext = valType === 'object'
  //   return
  // }
  // var len = AST.contents.length
  // var prev = AST.contents[len - 1]

  // if (JSONparse.skipNext) {
  //   var prevNode = prev.value
  //   if (!utils.isArray(prevNode.contents)) prevNode.contents = []

  //   var nodeType = prevNode.type === 'object' ? 'property' : 'item'
  //   var keyTypeNode = createNode(keyType, {contents: key})
  //   var valTypeNode = createNode(valType, {contents: val})
  //   prevNode.contents.push(createNode(nodeType, {
  //     key: keyTypeNode,
  //     value: valTypeNode,
  //     contents: [
  //       createNode('keyNode', {contents: key}),
  //       createNode('valueNode', {contents: val}),
  //     ]
  //   }))
  //   JSONparse.skipNext = false
  //   return
  // }

  // console.log('key:', key, ', val:', val)
  // console.log('====')
})

// function walk (ast, fn) {
//   if (utils.isArray(ast.contents)) {
//     ast.contents.forEach(fn)
//     return
//   }
//   fn(ast)
// }

// console.log(AST.contents)
// console.log(AST.contents)
// console.log(AST.contents[4].contents[1])
// console.log(AST.contents[4].value)

// walk(AST, function (node) {
//   console.log(node)
// })
