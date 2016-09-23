'use strict'

var utils = require('./index')

/**
 * > Compiles `template` asynchronously if `callback`
 * is given, otherwise works as `.compileSync`.
 *
 * @param  {String} `template`
 * @param  {Function} `callback`
 * @api public
 */

module.exports = function compile (template, callback) {
  if (typeof callback === 'function') {
    var fn = null
    try {
      fn = this.factory(template)
    } catch (err) {
      callback(err)
      return
    }
    callback(null, fn)
    return
  }
  return this.factory(template)
}
