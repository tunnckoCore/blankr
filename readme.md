## API
### Table of contents
- [strip](#strip)
- [strip.block()](#stripblock)
- [strip.line()](#stripline)

### strip(str[, opts])
Strip all comments

- `str` **{String}** file content or string to strip to
- `opts` **{Object}** options are passed to `.block`, and `.line`
- `return` **{String}**

**Source:**
```js
var strip = module.exports = function(str, opts) {
  return str ? strip.block(strip.line(str, opts), opts) : '';
};
```

### strip.block(str[, opts])
Strip only block comments

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

### strip.line(str[, opts])
Strip only line comments

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
};```

