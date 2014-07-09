
# Badges
> [![NPM version][npmjs-shields]][npmjs-url] [![Using ferver][ferver-img]][ferver-url] [![Build Status][travis-img]][travis-url] [![Dependency Status][depstat-img]][depstat-url]

# js-code-context
> RegExp expressions to parse javascript code context - for node and the browser.



## Install [![Nodei.co stats][npmjs-install]][npmjs-url] 
> Install with [npm](https://npmjs.org)

```
$ npm install js-code-context
```


## Usage & Example
> For a more comprehensive example, see the [tests](./test/index.js).

```js
var fs = require('fs');
var parseCodeContext = require('js-code-context');
var context = fs.readFileSync('./fixture.js','utf-8');

parseCodeContext(context, function(err, obj) {
  console.log(obj)
  //=> returns array of parsed objects
});

parseCodeContext(context, 6, function(err, obj) {
  console.log(obj)
  //=> returns array with 1 object for parsed 7th line of context
});
```


## Tests
> As usual - `npm test` **or** if you have [mocha][mocha-url] globally - `mocha`.

```
$ npm test
```


## Authors & Contributors [![author tips][author-gittip-img]][author-gittip]

**Charlike Mike Reagent**
+ [gittip/tunnckoCore][author-gittip]
+ [github/tunnckoCore][author-github]
+ [twitter/tunnckoCore][author-twitter]
+ [npmjs/tunnckoCore][author-npmjs]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][author-website], [contributors](https://github.com/tunnckoCore/js-code-context/graphs/contributors).  
Released under the [`MIT`][license-url] license.



[mocha-url]: https://github.com/visionmedia/mocha

[npmjs-url]: http://npm.im/koa-better-body
[npmjs-shields]: http://img.shields.io/npm/v/koa-better-body.svg
[npmjs-install]: https://nodei.co/npm/koa-better-body.svg?mini=true

[license-url]: https://github.com/tunnckoCore/koa-better-body/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/koa-better-body
[travis-img]: https://travis-ci.org/tunnckoCore/koa-better-body.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/koa-better-body
[depstat-img]: https://david-dm.org/tunnckoCore/koa-better-body.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore

[ferver-img]: http://img.shields.io/badge/using-ferver-brightgreen.svg
[ferver-url]: https://github.com/jonathanong/ferver
