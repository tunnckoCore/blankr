'use strict'

var utils = require('./index')

/**
 * > Renders `fp` with `locals` synchronously.
 * The `fp` can be vinyl-like file, or filepath.
 * Throws if `opts` is callback function.
 *
 * @param  {String|Object} `fp` filepath or object with `path` and `contents` properties
 * @param  {Object} `locals` data to be rendered
 * @param  {Object|Function} `opts` options like `encoding` and `cwd`
 * @return {String} or throws an error if `opts` is function
 * @throws {TypeError} if `opts` is function
 * @api public
 */

module.exports = function renderFileSync (fp, locals, opts) {
  if (typeof opts === 'function') {
    throw new TypeError('.renderFileSync: does not accept callback')
  }
  return this.renderFile(fp, locals, opts)
}
