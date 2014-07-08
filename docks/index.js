/*!
 * docks <https://github.com/tunnckoCore/docks>
 * @todo repo, npm, clean, template, docs
 * 
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var parser = require('./parser');
var reBlock = '\\/\\*\\*(.|[\\r\\n]|\\n)*?\\*\\/\\n?\\n?';


/**
 * Initialize a new `Docks` builder with a working `content`.
 *
 * @param  {String}  content  optional, content to parse
 */

function Docks(content) {
  this.contents = content ? content : '';
  this._comments = [];
  this._sources = [];
  this._results = [];
  this.regex = new RegExp('^' + reBlock, 'gm');
}

/**
 * Provide content from who to parse comments/sources
 *
 * @param   {String}  content  optional, content to parse
 * @return  {Docks}
 */

Docks.prototype.content = function (content) {
  this.contents = content;
  return this;
};

/**
 * Get comments from previously given content
 *
 * @return  {Array}
 */

Docks.prototype.comments = function() {
  return this._comments;
};

/**
 * Get source for every comment,
 * from previously given content
 *
 * @return  {Array}
 */

Docks.prototype.sources = function() {
  return this._sources;
};

/**
 * Get final parsed result 
 * from previously given content
 * 
 * @return  {Object}
 */

Docks.prototype.result = function() {
  return this._results;
};

/**
 * Parse only comments of given content
 *
 * @param   {String}  content  optional, parse/extract `comments` of the given content
 * @return  {Docks}
 */

Docks.prototype.parseComments = function(content) {
  content = this.contents ? this.contents : content;
  this._comments = content.match(this.regex);
  return this;
};

/**
 * Parse only source of given content
 *
 * @param   {String}  content  optional, parse/extract `sources` of the given content
 * @return  {Docks}
 */

Docks.prototype.parseSources = function(content) {
  content = this.contents ? this.contents : content;
  this._sources = content.split(this.regex).slice(1).filter(function(item, i) {
    return item[0] !== ' '
  });
  return this;
};

/**
 * Parse given content
 *
 * @param   {String}  content  optional, content to parse
 * @return  {Object}           object with `comments` array and `sources` array
 */

Docks.prototype.parse = function (content) {
  var self = this;
  content = this.contents ? this.contents : content;
  this.parseComments(content);
  this.parseSources(content);

  this._comments.forEach(function(comment, index) {
    comment = parser.parseComment(comment);
    comment.isPrivate = comment.api && comment.api !== 'private' ? false : true;
    comment.ignore = comment.description[2] !== '!' ? false : true;
    comment.source = self._sources[index]
    comment.context = self.parseCodeContext(comment.source);

    if (/`\@/gm.test(comment.description)) {
      comment.description = comment.description.replace(/`\@/gm, '@');
    }

    comment.description = comment.description.replace(/^\*\*\!?\n/, '');
    self._results.push(comment)
  });
  return this._results;
};

/**
 * Parse the context from the given `str` of js.
 *
 * This method attempts to discover the context
 * for the comment based on it's code. Currently
 * supports:
 *
 *   - function statements
 *   - function expressions
 *   - prototype methods
 *   - prototype properties
 *   - methods
 *   - properties
 *   - declarations
 *
 * @param   {String}  str 
 * @return  {Object}      
 * @api public
 */

Docks.prototype.parseCodeContext = function(str){
  var str = str.split('\n')[0];

  // function statement
  if (/^function ([\w$]+) *\(/.exec(str)) {
    return {
        type: 'function'
      , name: RegExp.$1
      , string: RegExp.$1 + '()'
    };
  // function expression
  } else if (/^var *([\w$]+)[ \t]*=[ \t]*function/.exec(str)) {
    return {
        type: 'function'
      , name: RegExp.$1
      , string: RegExp.$1 + '()'
    };
  // prototype method
  } else if (/^([\w$]+)\.prototype\.([\w$]+)[ \t]*=[ \t]*function/.exec(str)) {
    return {
        type: 'method'
      , constructor: RegExp.$1
      , cons: RegExp.$1
      , name: RegExp.$2
      , string: RegExp.$1 + '.prototype.' + RegExp.$2 + '()'
    };
  // prototype property
  } else if (/^([\w$]+)\.prototype\.([\w$]+)[ \t]*=[ \t]*([^\n;]+)/.exec(str)) {
    return {
        type: 'property'
      , constructor: RegExp.$1
      , cons: RegExp.$1
      , name: RegExp.$2
      , value: RegExp.$3
      , string: RegExp.$1 + '.prototype.' + RegExp.$2
    };
  // method
  } else if (/^([\w$.]+)\.([\w$]+)[ \t]*=[ \t]*function/.exec(str)) {
    return {
        type: 'method'
      , receiver: RegExp.$1
      , name: RegExp.$2
      , string: RegExp.$1 + '.' + RegExp.$2 + '()'
    };
  // property
  } else if (/^([\w$]+)\.([\w$]+)[ \t]*=[ \t]*([^\n;]+)/.exec(str)) {
    return {
        type: 'property'
      , receiver: RegExp.$1
      , name: RegExp.$2
      , value: RegExp.$3
      , string: RegExp.$1 + '.' + RegExp.$2
    };
  // declaration
  } else if (/^var +([\w$]+)[ \t]*=[ \t]*([^\n;]+)/.exec(str)) {
    return {
        type: 'declaration'
      , name: RegExp.$1
      , value: RegExp.$2
      , string: RegExp.$1
    };
  }
};

/**
 * Expose `Docks`.
 */

module.exports = Docks;