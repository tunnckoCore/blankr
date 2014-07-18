# Docks
> Expressive streaming docs (api) generator with templates, auto-toc (table of contents) and extensible with plugins.

(WIP) Basically it's intended to be used as plugin for Ock.JS (and maybe gulp).

[![NPM version][npmjs-shields]][npmjs-url]
[![Using ferver][ferver-img]][ferver-url]
[![Build Status][travis-img]][travis-url]
[![Dependency Status][depstat-img]][depstat-url]


## Install [![Nodei.co stats][npmjs-install]][npmjs-url] 
> Install with [npm](https://npmjs.org)

```
$ npm install docks
```


## Usage & Example
> For a more comprehensive example, see `generate.js`.
This readme was generated with it.

```bash
$ node generate.js parse > api.json
$ node generate.js docs > api.md
```


## API
### Docks()
Initialize a new `Docks` instance with `content` to parse.

**members**
- [content(content)](#docks-content)
- [comments()](#docks-comments)
- [sources()](#docks-sources)
- [result()](#docks-result)
- [parseComments(content)](#docks-parsecomments)
- [parseSources(content)](#docks-parsesources)
- [parse(content)](#docks-parse)

**params**
- `[content]` **{String}** optional, content to parse

**example**

```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks(content);
docks.parse();
```

**source**
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

#### Docks# content()
Provide content from who to parse comments/sources

**params**
- `<content>` **{String}** optional, content to parse
- `return` **{Docks}**

**example**
```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .content(content)
  .parse();
```

**source**
```js
Docks.prototype.content = function (content) {
  this.contents = content;
  return this;
};
```


#### Docks# comments()
Get comments from previously given content

**params**
- `return` **{Array}**

**example**
```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .content(content)
  .comments();
```

**source**
```js
Docks.prototype.comments = function() {
  return this._comments;
};
```

#### Docks# sources()
Get source for every comment,
from previously given content.

**params**
- `return` **{Array}**

**example**
```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .content(content)
  .sources();
```

**source**
```js
Docks.prototype.sources = function() {
  return this._sources;
};
```


#### Docks# result()
Get final parsed result
from previously given content

**params**
- `return` **{Object}**

**example**
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

**source**
```js
Docks.prototype.result = function() {
  return this._results;
};
```


#### Docks# parseComments()
Parse only comments of given content

**params**
- `[content]` **{String}** optional, parse/extract `comments` of the given content
- `return` **{Docks}**

**example**
```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .parseComments(content)
  .comments();
```

**source**
```js
Docks.prototype.parseComments = function(content) {
  content = this.contents ? this.contents : content;
  this._comments = content.match(this.regex);
  return this;
};
```


#### Docks# parseSources()
Parse only source of given content

**params**
- `[content]` **{String}** optional, parse/extract `sources` of the given content
- `return` **{Docks}**

**example**
```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks
  .parseSources(content)
  .sources();
```

**source**
```js
Docks.prototype.parseSources = function(content) {
  content = this.contents ? this.contents : content;
  this._sources = content.split(this.regex).slice(1).filter(function(item, i) {
    return item[0] !== ' '
  });
  return this;
};
```


#### Docks# parse()
Parse given content

**params**
- `[content]` **{String}** optional, content to parse
- `return` **{Object}** object with `comments` array and `sources` array

**example**
```js
var Docks = require('docks');
var fs = require('fs');

var content = fs.readFileSync('somefile.js', 'utf-8');
var docks = new Docks();
docks.parse(content);
```

**source**
```js
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
```


## Authors & Contributors [![author tips][author-gittip-img]][author-gittip]

**Charlike Mike Reagent**
+ [gittip/tunnckoCore][author-gittip]
+ [github/tunnckoCore][author-github]
+ [twitter/tunnckoCore][author-twitter]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][author-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][author-website], [contributors][contrib-url].  
Released under the [`MIT`][license-url] license.


[mocha-url]: https://github.com/visionmedia/mocha

[contrib-url]: https://github.com/tunnckoCore/docks/graphs/contributors
[npmjs-url]: http://npm.im/docks
[npmjs-shields]: http://img.shields.io/npm/v/docks.svg
[npmjs-install]: https://nodei.co/npm/docks.svg?mini=true

[license-url]: https://github.com/tunnckoCore/docks/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/docks
[travis-img]: https://travis-ci.org/tunnckoCore/docks.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/docks
[depstat-img]: https://david-dm.org/tunnckoCore/docks.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore
[author-more]: http://j.mp/1stW47C

[ferver-img]: http://img.shields.io/badge/using-ferver-585858.svg
[ferver-url]: https://github.com/jonathanong/ferver

[js-code-context-url]: https://github.com/tunnckoCore/js-code-context