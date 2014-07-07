## API
### Table of contents
- [strip](#strip)
- [strip.block()](#stripblock)
- [strip.line()](#stripline)

### strip
Strip all comments

**Example:**
```js
/*!
 * this multiline
 * block comment, no matter it is `top banner`
 * it will not be removed, cuz it have `!`
 */

'use strict';

/**!
 * and this multiline
 * block comment
 */
var foo = function(/* and these single-line block comment */) {};

/**
 * and this multiline
 * block comment
 */
var bar = function(/* and these single-line block comment */) {};

// this single-line line comment
var baz = function () {
  // this multiline
  // line comment
  var some = true;
  //
  var fafa = true; //may be and this
  // var also = 'that';
  var but = 'not'; //! that comment
};

// also this multiline
// line comment
var fun = false;
```
- `str` **{String}** file content or string to strip to
- `opts` **{Object}** options are passed to `#block`, and `#line`
- `return` **{String|Array}**

**Source:**
```js
var strip = module.exports = function(str, opts) {
  return str ? strip.block(strip.line(str, opts), opts) : '';
};
```

### strip.block()
Strip only all block comments by default

**Example:**
```js
/**
 * this multiline
 * block comment
 */
var bar = function(/* and these single-line block comment */) {
  /**
   * also that comment
   */
  var str = 'something'
};
```
- `str` **{String}** file content or string to strip to
- `opts` **{Object}** if `safe:true`, strip only that not starts with `/*!` or `/**!`
- `return` **{String}**

**Source:**
```js
strip.block = function(str, opts) {
  opts = opts || {};
  var re = new RegExp(reBlock + reBlockEnd, 'gm');
  if(opts.safe) {
    re = new RegExp(reBlockIgnore + reBlockEnd, 'gm');
  }
  return str ? str.replace(re, '') : '';
};
```

### strip.line()
Strip all line comments

**Example:**
```js
// this single-line line comment
var baz = function () {
  // this multiline
  // line comment
  var some = true;
  //this
  var fafa = true; //and this
  // var also = 'that';
  var but = 'not'; //! that comment
};
```
- `str` **{String}** file content or string to strip to
- `opts` **{Object}** if `safe:true`, strip all that not starts with `//!`
- `return` **{String}**

**Source:**
```js
strip.line = function(str, opts) {
  opts = opts || {};
  var re = new RegExp(reLine, 'gm');
  if(opts.safe) {
    re = new RegExp(reLineIgnore, 'gm');
  }
  return str ? str.replace(re, '') : '';
};
```

