/*!
 * postjson <https://github.com/tunnckoCore/postjson>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')
var Base = utils.Base.namespace('cache')

function PostJSON (options) {
  if (!(this instanceof PostJSON)) {
    return new PostJSON(options)
  }
  Base.call(this)
  this.options = utils.extend({
    parser: utils.postjsonParser,
    render: utils.postjsonRender
  }, options || this.options)
  this.use(utils.plugins())
}

Base.extend(PostJSON)

/**
 * > Parse a `input` to abstract syntax tree (AST) and writes
 * it to `.tree` property of the `this` instance.
 *
 * @param  {String} `input`
 * @param  {Object} `options`
 * @return {PostJSON} instance for chaining
 * @api public
 */

PostJSON.prototype.parse = function parse (input, options) {
  this.options = options ? utils.extend({}, this.options, options) : this.options
  this.set('input', utils.validateInput(input, this.options))
  this.set('ast', this.options.parser.call(this, this.cache.input, this.options))
  // this.set('ast', this.options.parser.call(this, this.cache.input, this.options))
  return this
}

/**
 * > Render a given `ast`. Or you can just use it in combination
 * with `.parse(str)` which writes the `ast` to instance, then `.render`
 * will use it. If only one argument is passed it is assumed as `options`.
 *
 * @param  {Object} `ast` (optional) Abstract Syntax Tree, otherwise will use `this.ast`
 * @param  {Object} `options`
 * @return {PostJSON} instance for chaining
 * @api public
 */

PostJSON.prototype.render = function render (ast, options) {
  var isObj = typeof ast === 'object'
  var isOk = isObj && utils.isArray(ast.tree)

  this.options = options ? utils.extend({}, this.options, options) : this.options
  this.set('ast', isOk && arguments.length > 1 ? ast : this.cache.ast)
  this.set('json', this.options.render(this.cache.ast, this.options))
  return this
}

/**
 * > Returns stringified and already modified JSON.
 *
 * @param  {Object} `indent`
 * @return {String}
 * @api public
 */

PostJSON.prototype.toString = function toString (indent) {
  return JSON.stringify(this.cache.json, null, indent)
}

/**
 * > Transforms a `val` using previously passed plugins. Think for it
 * like `.parse` plus `.render` combination.
 *
 * @param  {String} `val`
 * @param  {Object} `options`
 * @return {PostJSON}
 * @api public
 */

PostJSON.prototype.process = function process (val, options) {
  this.parse(val, options)
  this.run(this.cache.ast)
  this.render(this.cache.ast, this.options)
  return this
}

/**
 * Expose `PostJSON` instance
 *
 * @type {Object}
 * @api private
 */

module.exports = new PostJSON()

/**
 * Expose `PostJSON` constructor
 *
 * @type {Function}
 * @api private
 */

module.exports.PostJSON = PostJSON
