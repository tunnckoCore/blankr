# randomorg-js
> Random.org JSON-RPC Javascript API - for node, command line (cli) and the browser.

[![NPM version][npmjs-shields]][npmjs-url]
[![Using ferver][ferver-img]][ferver-url]
[![Build Status][travis-img]][travis-url]


## Install [![Nodei.co stats][npmjs-install]][npmjs-url] 
> Install with [npm](https://npmjs.org)

```
$ npm install randomorg-js
```


## Usage & Example
> For a more comprehensive examples, see the [tests](./test/index.js).

```js


```


## CLI
> CLI uses `.sync` method. But it's not so sync, if we must be honest - in fact it's asynchronous. It just returns resulted array in variable, not in callback.

```
$ npm install --global randomorg-js
```
```
$ jsCodeContext --help

Options
  --help | -h  show help
  --line | -l  specify which line to parse
  --file | -f  file that want to parse

Example
  $ jsCodeContext -f ./test/fixture.js -l 6
  //=> array with one object
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
Copyright (c) 2014 [Charlike Mike Reagent][author-website], [contributors][contrib-url].  
Released under the [`MIT`][license-url] license.


[mocha-url]: https://github.com/visionmedia/mocha

[contrib-url]: https://github.com/tunnckoCore/randomorg-js/graphs/contributors
[npmjs-url]: http://npm.im/randomorg-js
[npmjs-shields]: http://img.shields.io/npm/v/randomorg-js.svg
[npmjs-install]: https://nodei.co/npm/randomorg-js.svg?mini=true

[license-url]: https://github.com/tunnckoCore/randomorg-js/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/randomorg-js
[travis-img]: https://travis-ci.org/tunnckoCore/randomorg-js.svg?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/randomorg-js
[depstat-img]: https://david-dm.org/tunnckoCore/randomorg-js.svg

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore

[ferver-img]: http://img.shields.io/badge/using-ferver-585858.svg
[ferver-url]: https://github.com/jonathanong/ferver
