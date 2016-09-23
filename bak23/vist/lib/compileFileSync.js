'use strict'

var utils = require('./index')

/**
 * > Compiles `fp` synchronously.
 * The `fp` can be vinyl-like file, or filepath.
 * Throws if `opts` is callback function.
 *
 * @param  {String|Object} `fp` filepath or object with `path` and `contents` properties
 * @param  {Object|Function} `opts` options like `encoding` and `cwd`
 * @return {Function} or throws an error if `opts` is function
 * @throws {TypeError} if `opts` is function
 * @api public
 */

module.exports = function compileFileSync (fp, opts) {
  if (typeof opts === 'function') {
    throw new TypeError('.compileFileSync: does not accept callback')
  }
  return this.compileFile(fp, opts)
}
