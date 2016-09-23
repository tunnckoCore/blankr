'use strict'

var utils = require('./index')

/**
 * > Renders `fp` with `locals` asynchronously.
 * The `fp` can be vinyl-like file, or filepath.
 *
 * @param  {String|Object} `fp` path to file or object
 *                               with `path` and `contents` properties
 * @param  {Object} `locals` data to be rendered
 * @param  {Object|Function} `opts` options like `encoding` and `cwd`,
 *                                   or `callback` function
 * @param  {Function} `callback` optional function
 * @return {String} if no `callback` is given
 * @api public
 */

module.exports = function renderFile (fp, locals, opts, cb) {
  var file = utils.normalize(fp, locals, opts, cb)

  if (!file.isAsync) {
    return this.compileFileSync(file, file.options)(file.locals)
  }
  this.compileFile(file, file.options, function done (err, fn) {
    if (err) return file.callback(err)
    var res = null
    try {
      res = fn(file.locals)
    } catch (err) {
      file.callback(err)
      return
    }
    file.callback(null, res)
  })
}
