/*!
 * docks <https://github.com/tunnckoCore/docks>
 * 
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var eachAsync = require('each-async');
var jsCodeContext = require('js-code-context');
var parser = require('./parser');
var reBlock = '\\/\\*\\*(.|[\\r\\n]|\\n)*?\\*\\/\\n?\\n?';

/**
 * Initialize a new `Docks` instance with `content` to parse.
 *
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks(content);
 * docks.parse();
 * ```
 * 
 * @param  {String}  [content]  optional, content to parse
 * @api public
 */

function Docks(content) {
  if (!(this instanceof Docks)) {return new Docks(content);}
  this.contents = content ? content : '';
  this._comments = [];
  this._sources = [];
  this._results = [];
  this.regex = new RegExp('^' + reBlock, 'gm');
}

/**
 * Provide content from who to parse comments/sources
 * 
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks
 *   .content(content)
 *   .parse();
 * ```
 * 
 * @param   {String}  <content>  optional, content to parse
 * @return  {Docks}
 * @api public
 */

Docks.prototype.content = function (content) {
  this.contents = content;
  return this;
};

/**
 * Get comments from previously given content
 * 
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks
 *   .content(content)
 *   .comments();
 * ```
 *
 * @return  {Array}
 * @api public
 */

Docks.prototype.comments = function() {
  return this._comments;
};

/**
 * Get source for every comment,
 * from previously given content
 * 
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks
 *   .content(content)
 *   .sources();
 * ```
 * 
 * @return  {Array}
 * @api public
 */

Docks.prototype.sources = function() {
  return this._sources;
};

/**
 * Get final parsed result 
 * from previously given content
 * 
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks
 *   .content(content)
 *   .parse()
 *   .result();
 * ```
 *
 * @return  {Object}
 * @api public
 */

Docks.prototype.result = function() {
  return this._results;
};

/**
 * Parse only comments of given content
 * 
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks
 *   .parseComments(content)
 *   .comments();
 * ```
 *
 * @param   {String}  [content]  parse/extract `comments` of the given content
 * @return  {Docks}
 * @api public
 */

Docks.prototype.parseComments = function(content) {
  content = this.contents ? this.contents : content;
  this._comments = content.match(this.regex);
  return this;
};

/**
 * Parse only source of given content
 * 
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks
 *   .parseSources(content)
 *   .sources();
 * ```
 *
 * @param   {String}  [content]  parse/extract `sources` of the given content
 * @return  {Docks}
 * @api public
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
 * **example**
 * ```js
 * var Docks = require('docks');
 * var fs = require('fs');
 *
 * var content = fs.readFileSync('somefile.js', 'utf-8');
 * var docks = new Docks();
 * docks.parse(content);
 * ```
 *
 * @param   {String}  [content]  content to parse
 * @return  {Object}             object with `comments` array and `sources` array
 * @api public
 */

Docks.prototype.parse = function (content) {
  var self = this;
  content = this.contents ? this.contents : content;
  this.parseComments(content);
  this.parseSources(content);

  eachAsync(this._comments, function(comment, index, done) {
    comment = parser.parseComment(comment);
    comment.isPrivate = comment.api && comment.api === 'private' ? true : false;
    comment.ignore = comment.description[2] !== '!' ? false : true;
    comment.source = self._sources[index]
    comment.context = self.parseCodeContext(comment.source);

    if (/`\@/gm.test(comment.description)) {
      comment.description = comment.description.replace(/`\@/gm, '@');
    }

    comment.description = comment.description.replace(/^\*\*\!?\n/, '');
    self._results.push(comment);
    done();
  }, function (err) {
    if (err) {console.error(err)};
  });
  return this._results;
};

/**
 * Parse the context from the given `str` of js.
 *
 * This method attempts to discover the context ([js-code-context][js-code-context-url]
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
 * @api private
 */

Docks.prototype.parseCodeContext = jsCodeContext.sync;

/**
 * Expose `Docks`.
 */

module.exports = Docks;
