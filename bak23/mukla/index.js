/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')
var asia = require('./api')
var Asia = require('./api').Asia

function proxy (opts) {
  if (utils.isObject(opts)) {
    asia.option(opts)
  } else {
    asia.addTest.apply(asia, arguments)
  }
  return asia
}

setTimeout(function () {
  asia.runTests(function (err, res) {
    // only on `settle: false`
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }
    // console.log(res)
  })
}, 0)

module.exports = utils.forward(proxy, asia)
module.exports.Asia = Asia
