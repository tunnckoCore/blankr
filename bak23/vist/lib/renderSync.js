'use strict'

var utils = require('./index')

/**
 * > Renders `template` with `locals` synchronously and
 * returns a string.
 *
 * @param  {String} `template`
 * @param  {Object} `locals`
 * @return {String}
 * @api public
 */

module.exports = function renderSync (template, locals) {
  return this.render(template, locals)
}
