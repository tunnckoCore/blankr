/*!
 * docks <https://github.com/tunnckoCore/docks>
 *
 * NOTE: This is based on https://github.com/caolan/scrawl, modified for easily
 * using the generated output with documentation generators, like verb.
 *
 * Copyright (c) 2014 Jon Schlinkert, Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('./utils');

function parseTags(comment) {
  // strip trailing whitespace from description
  if (comment.description) {
    comment.description = utils.trimRight(comment.description);
  }

  // strip trailing whitespace from examples
  if (comment.example) {
    comment.example = utils.trimRight(comment.example);
  }

  // parse @param tags
  if (comment.param) {
    var params = comment.param || [];
    params = !Array.isArray(params) ? [params] : params;

    comment.params = params.map(function (str) {
      return utils.parseParams(str);
    });
  }

  // parse @returns tags
  if (comment.returns) {
    var match = /^\{([^\}]+)\}/.exec(comment.returns);
    if (match) {
      comment.returns = match[1];
    }
  }
  return comment;
};



function parseComment(str) {
  var afterTags = false;
  var lines = str.split('\n');
  var afterNewLine = false;
  var lastTag;

  var comment = lines.reduce(function (c, str) {
    var line = utils.stripStars(str);

    if (line) {
      var match = line.match(/^\s*@([\S]+)\s*(.*)/);
      if (match) {
        afterTags = true;
        var tagname = match[1];
        var tagvalue = match[2].replace(/^\s+/, '');
        lastTag = tagname;
        if (c.hasOwnProperty(tagname)) {
          // tag already exists
          if (!Array.isArray(c[tagname])) {
            c[tagname] = [c[tagname]];
          }
          c[tagname].push(tagvalue);
        } else {
          // new tag
          c[tagname] = tagvalue || true;
        }
      } else if (lastTag && !afterNewLine) {
        var val = line.replace(/^\s+/, '');
        if (Array.isArray(c[lastTag])) {
          c[lastTag][c[lastTag].length - 1] += ' ' + val;
        } else {
          c[lastTag] += ' ' + val;
        }
      } else {
        lastTag = null;
        if (!afterTags) {
          if (c.description) {
            c.description += '\n' + line;
          } else {
            c.description = line;
          }
        } else {
          if (c.example) {
            c.example += '\n' + line;
          } else {
            c.example = line;
          }
        }
      }
      afterNewLine = false;
    } else {
      afterNewLine = true;
      if (!afterTags) {
        if (c.description) {
          c.description += '\n' + line;
        }
      } else {
        if (c.example) {
          c.example += '\n' + line;
        }
      }
    }
    return c;
  }, {});

  return parseTags(comment);
};



module.exports = parse;
module.exports.parseComment = parseComment;
module.exports.parseTags = parseTags;

/**
 * Parse comments
 * @param   {String}  str
 * @return  {String}
 */

function parse(str, fn) {
  var match, comments = [];
  var lineNumber = 1;
  var docks = stripster.docks(str);

  fn = fn || function(comment) {
    return /private/.test(comment.api);
  };

  /*for (var i=0; i < docks.comments.length; i++) {
    var comment = parseComment(docks.comments[i]);

    // Allow @words to be escaped with a single backtick, e.g. `@word,
    // then remove the backtick before the final result.
    if (/^\`\@/gm.test(comment.description)) {
      comment.description = comment.description.replace(/^`@/gm, '@');
    }

    if (!fn(comment)) {
      comment.source = docks.sources[i];
      comments.push(comment);
    }
  }*/

  while (match = (/\/\*\*([\s\S]*?)\*\//g).exec(str)) {
    var _str = str;

    // add lines from before the comment
    lineNumber += utils.countNewLines(_str.substr(0, match.index));
    str = str.substr(match.index + match[1].length);
    var comment = parseComment(match[1]);
    comment.line = lineNumber;

    // Allow @words to be escaped with a single backtick, e.g. `@word,
    // then remove the backtick before the final result.
    if (/^\`\@/gm.test(comment.description)) {
      comment.description = comment.description.replace(/^`@/gm, '@');
    }

    if (!fn(comment)) {
      comments.push(comment);
    }

    // add lines from the comment itself
    lineNumber += utils.countNewLines(_str.substr(match.index, match[1].length));
  }
  return comments;
};
