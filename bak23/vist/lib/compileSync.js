'use strict'

var utils = require('./index')

/**
 * > Compiles `template` synchronously and
 * returns a render function which accepts `locals`.
 *
 * @param  {String} `template`
 * @return {Function}
 * @api public
 */

module.exports = function compileSync (template) {
  return this.factory(template)
}
