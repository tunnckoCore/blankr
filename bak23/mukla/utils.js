'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign

/**
 * Lazily required module dependencies
 */

require('async-control', 'ctrl')
require('forward-object', 'forward')
require('get-fn-name', 'getName')
require('lazy-utils', 'utils')
require('letta')
require('set-value', 'set')
require = fn // eslint-disable-line no-undef, no-native-reassign

/**
 * Expose `utils` modules
 */

module.exports = utils.utils.extend(utils, utils.utils)
