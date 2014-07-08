## API
### Table of contents
- [Docks()](#docks)
- [Docks#content()](#dockscontent)
- [Docks#comments()](#dockscomments)
- [Docks#sources()](#dockssources)
- [Docks#result()](#docksresult)
- [Docks#parseComments()](#docksparsecomments)
- [Docks#parseSources()](#docksparsesources)
- [Docks#parse()](#docksparse)

### Docks()

Initialize a new `Docks` instance with `content` to parse.

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks(content);
docks.parse();
```

- `content` **{String}** optional, content to parse

**Source:**
```js
function Docks(content) {
  if (!(this instanceof Docks)) {return new Docks(content);}
  this.contents = content ? content : '';
  this._comments = [];
  this._sources = [];
  this._results = [];
  this.regex = new RegExp('^' + reBlock, 'gm');
}
```

### Docks#content()
Provide content from who to parse comments/sources

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .content(content)
  .parse();
```

- `content` **{String}** optional, content to parse
- `return` **{Docks}**

**Source:**
```js
Docks.prototype.content = function (content) {
  this.contents = content;
  return this;
};
```

### Docks#comments()
Get comments from previously given content

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .content(content)
  .comments();
```

- `return` **{Array}**

**Source:**
```js
Docks.prototype.comments = function() {
  return this._comments;
};
```

### Docks#sources()
Get source for every comment,
from previously given content

- `return` **{Array}**

**Source:**
```js
Docks.prototype.sources = function() {
  return this._sources;
};
```

### Docks#result()
Get final parsed result
from previously given content

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .content(content)
  .parse()
  .result();
```

- `return` **{Object}**

**Source:**
```js
Docks.prototype.result = function() {
  return this._results;
};
```

### Docks#parseComments()
Parse only comments of given content

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .parseComments(content)
  .comments();
```

- `content` **{String}** optional, parse/extract `comments` of the given content
- `return` **{Docks}**

**Source:**
```js
Docks.prototype.parseComments = function(content) {
  content = this.contents ? this.contents : content;
  this._comments = content.match(this.regex);
  return this;
};
```

### Docks#parseSources()
Parse only source of given content

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .parseSources(content)
  .sources();
```

- `content` **{String}** optional, parse/extract `sources` of the given content
- `return` **{Docks}**

**Source:**
```js
Docks.prototype.parseSources = function(content) {
  content = this.contents ? this.contents : content;
  this._sources = content.split(this.regex).slice(1).filter(function(item, i) {
    return item[0] !== ' '
  });
  return this;
};
```

### Docks#parse()
Parse given content

**Example:**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks.parse(content);
```

- `content` **{String}** optional, content to parse
- `return` **{Object}**           object with `comments` array and `sources` array

**Source:**
```js
Docks.prototype.parse = function (content) {
  var self = this;
  content = this.contents ? this.contents : content;
  this.parseComments(content);
  this.parseSources(content);

  this._comments.forEach(function(comment, index) {
    comment = parser.parseComment(comment);
    comment.isPrivate = comment.api && comment.api === 'private' ? true : false;
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
```

