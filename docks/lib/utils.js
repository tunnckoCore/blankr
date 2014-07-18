/*!
 * docks <https://github.com/tunnckoCore/docks>
 *
 * Copyright (c) 2014 Jon Schlinkert, Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var utils = module.exports = {};

utils.trimRight = function(str) {
  return str.replace(/\s+$/, '');
};

utils.countNewLines = function (str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '\n') {
      count++;
    }
  }
  return count;
};

utils.stripStars = function (line) {
  return utils.trimRight(line.replace(/^\s*\*?\s?\/?/, ''));
};

utils.parseParams = function(param) {
  var re = /(?:^\{([^\}]+)\}\s+)?(?:([\S]+)\s*)?([\s\S]*)?/;
  var match = param.match(re);
  var optional = match[2][0] === '[' && match[2].slice(-1) === ']' ? true : false;
  return {
    type: match[1],
    name: match[2].replace(/[[\]<>]/g, ''),
    description: (match[3] || '').replace(/^\s*-\s*/, ''),
    optional: optional,
    required: !optional
  };
};

