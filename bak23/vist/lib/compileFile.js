'use strict'

var utils = require('./index')

/**
 * > Compiles `fp` asynchronously if `callback` is given,
 * otherwise compiles it synchronously.
 * The `fp` can be vinyl-like file, or filepath.
 *
 * @param  {String|Object} `fp` filepath or object with `path` and `contents` properties
 * @param  {Object|Function} `opts` options like `encoding` and `cwd`, or `callback` function
 * @param  {Function} `callback` optional function
 * @return {Function} if no `callback` is given
 * @api public
 */

module.exports = function compileFile (fp, opts, callback) {
  var file = utils.normalize(fp, {}, opts, callback)

  // if sync and no contents -> fs.readFileSync
  if (!file.isAsync && !file.contents) {
    file.contents = utils.readFile(file.path, file.options)
  }
  // if async and no contents -> fs.readFile
  if (file.isAsync && !file.contents) {
    utils.readFile(file.path, file.options, function cb (err, res) {
      if (err) return file.callback(err)
      file.contents = res
      this.compile(file.contents, file.callback)
    }.bind(this))
    return
  }

  return this.compile(file.contents, file.callback)
}
