'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign

/**
 * Lazily required module dependencies
 */

require('base', 'Base')
require('base-plugins', 'plugins')
require('for-own', 'forOwn')
require('kind-of', 'kindOf')
require('lazy-utils', 'utils')
require = fn // eslint-disable-line no-undef, no-native-reassign

utils.error = function createError (msg) {
  throw new Error('postjson.parse: ' + msg)
}

utils.validateInput = function validateInput (input, options) {
  if (!input) return utils.error('expect `input` be to be passed')
  if (utils.isArray(input)) {
    return input.length > 0
      ? JSON.stringify(input)
      : utils.error('expect `input` to be non empty array')
  }
  if (typeof input === 'object') {
    return Object.keys(input).length > 0
      ? JSON.stringify(input)
      : utils.error('expect `input` to be non empty object')
  }
  if (typeof input === 'string') {
    var firstChar = input[0] === '{' || input[0] === '['

    return input.length > 0
      ? (firstChar && options.strict !== false
          ? input
          : utils.error('expect `input` to be in strict mode'))
      : utils.error('expect `input` to be non empty string')
  }
}

utils.postjsonParser = function postjsonParser (input) {
  this.set('input', JSON.parse(input))

  function parse (v, tr) {
    utils.forOwn(v, function (val, key) {
      var node = {key: key, type: utils.kindOf(val)}
      if (node.type === 'array') {
        node.value = []
        val.forEach(function (item, idx) {
          item = utils.arrayify(item)
          node.value.push({key: idx, type: utils.kindOf(val), value: item})
        })
      } else if (node.type === 'object') {
        node.value = parse(val, [])
      } else {
        node.value = [val]
      }
      tr.push(node)
    })
    return tr
  }

  var ast = {tree: []}
  ast.tree = parse(this.cache.input, ast.tree)
  return ast
}

/**
 * Render
 * @param  {[type]} tree [description]
 * @return {[type]}      [description]
 */
utils.postjsonRender = function postjsonRender (ast) {
  function render (tr, res) {
    utils.arrayify(tr).forEach(function (node) {
      if (node.type === 'object') {
        res[node.key] = render(node.value, {})
        return
      }
      if (node.type === 'array') {
        res[node.key] = []
        utils.arrayify(node.value).forEach(function (item) {
          res[node.key].push(item.value[0])
        })
        return
      }
      if (node.value && node.value.length === 1) {
        res[node.key] = node.value[0]
        return
      }
      res[node.key] = node.value
    })
    return res
  }

  var json = {}
  return render(ast.tree, json)
}

/**
 * Expose `utils` modules
 */

module.exports = utils.utils.extend(utils, utils.utils)
