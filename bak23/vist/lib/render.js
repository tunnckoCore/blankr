'use strict'

var utils = require('./index')

/**
 * > Renders `template` with `locals` asynchronously
 * if `callback` is given, otherwise works as `.renderSync`.
 *
 * @param  {String} `template`
 * @param  {Object} `locals`
 * @param  {Function} `callback`
 * @api public
 */

module.exports = function render (template, locals, callback) {
  if (typeof callback === 'function') {
    this.compile(template, function compileBack (err, fn) {
      if (err) return callback(err)

      var str = null
      try {
        str = fn(locals)
      } catch (err) {
        callback(err)
        return
      }
      callback(null, str)
    })
    return
  }
  return this.factory(template)(locals)
}
