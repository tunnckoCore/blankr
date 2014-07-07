## API
### Table of contents
- [strip.banner()](#stripbanner)
- [strip.safeBlock()](#stripsafeblock)
- [strip.block()](#stripblock)
- [strip.line()](#stripline)

### strip.banner()
Strip banners

- `str` **{String}** 
- `return` **{String}**

**Source:**
```js
strip.banner = function(str, opts) {
  opts = opts || {};
  var re = new RegExp('^' + reBlock + '\\s+', 'g');
  if(opts.safe) {
    re = new RegExp('^[^\\/\*\*?\!]' + reBlock + '\\s+', 'g');
  }
  return str ? str.replace(re, '') : '';
};

```

### strip.safeBlock()
Strip block comments except
for banner

- `str` **{String}** 
- `return` **{String}**

**Source:**
```js
strip.safeBlock = function(str) {
  var re = new RegExp('[^\\/\*\*?\!]' + reBlock + '\\n', 'gm');
  return str ? str.replace(re, '') : '';
};

```

### strip.block()
Strip block comments

- `str` **{String}** 
- `return` **{String}**

**Source:**
```js
strip.block = function(str) {
  var re = new RegExp(reBlock, 'g');
  return str ? str.replace(re, '') : '';
};

```

### strip.line()
Strip line comments

- `str` **{String}** 
- `return` **{String}**

**Source:**
```js
strip.line = function(str) {
  var re = new RegExp(reLine, 'gm');
  return str ? str.replace(re, '') : '';
};

