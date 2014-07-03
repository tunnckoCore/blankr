# koa-better-body [![NPM version][npmjs-img]][npmjs-url] [![Build Status][travis-img]][travis-url] [![Dependency Status][depstat-img]][depstat-url]

> A full-feature [`koa`](https://github.com/koajs/koa) body parser middleware. Support `multipart`, `urlencoded` and `json` request bodies. Provides same functionality as Express's bodyParser - [`multer`](https://github.com/expressjs/multer). And all that is wrapped only around
[`co-body`](https://github.com/visionmedia/co-body) and [`formidable`](https://felixge/node-formidable)....


## Install [![Nodei.co stats][npmjs-install]][npmjs-url] 
> Install [`npmjs/koa-better-body`](http://npm.im/koa-better-body) with [npm](https://npm.im)

```bash
$ npm install koa-better-body
```

## Options

> `koa-body` supports all [`formidable`][formidable-url] **and** [`co-body`][cobody-url] (to [`raw-body`][rawbody-url]) options. Be sure to look at their READMEs for more information. However, `koa-body` have few custom options

```js
  var log     = console.log,
      app     = require('koa')(),
      koaBody = require('../index'),
      port    = process.env.PORT || 4290,
      host    = 'http://localhost';


  app
    .use(koaBody({
      multipart: true,
      formLimit: 15,
      formidable: {
        uploadDir: __dirname + '/uploads'
      }
    }))
    .use(function *(next) {
      if (this.request.method == 'POST') {
        log(this.request.body);
        // => POST body object
        this.body = JSON.stringify(this.request.body, null, 2);
      }
      yield next;
    })
    .listen(port);


  log('Visit %s:%s/ in browser.', host, port);
  log();
  log('Test with executing this commands:');
  log('curl -i %s:%s/whatever -d "name=charlike"', host, port);
  log('curl -i %s:%s/whatever -d "name=some-long-name-for-error"', host, port);
  log('curl -i %s:%s/whatever -F "source=@%s/avatar.png"', host, port, __dirname);
  log();
  log('Press CTRL+C to stop...');
```

- `patchNode` **{Boolean}** Patch request body to Node's `ctx.req` object, default `false`
- `patchKoa` **{Boolean}** Patch request body to Koa's `ctx.request` object, default `true`
- `jsonLimit` **{String|Number}** The byte limit of the JSON body, default `1mb`
- `formLimit` **{String|Number}** The byte limit of the form body, default `56kb`
- `encoding` **{String}** Sets encoding for incoming form fields, default `utf-8`
- `multipart` **{Boolean}** Support `multipart/form-data` request bodies, default `false`
- `formidable` **{Object}** Options that are passing to `formidable`
- `formidable.maxFields` **{Number}** koa-body's default is to `10`
- `formidable.multiples` **{Boolean}** koa-body's default is to `true`
- `formidable.keepExtensions` **{Boolean}** koa-body's default is to `true`
- `return` **{GeneratorFunction}** descr


## Authors & Contributors [![author tips][author-gittip-img]][author-gittip]
**Charlike Mike Reagent**
+ [gittip/tunnckoCore][author-gittip]
+ [github/tunnckoCore][author-github]
+ [twitter/tunnckoCore][author-twitter]
+ [npmjs/tunnckoCore][author-npmjs]


## Authors & Contributors [![author tips][author-gittip-img]][author-gittip]
+ **Charlike Mike Reagent** ~ [gittip][author-gittip] - [github][author-github] - [twitter][author-twitter] - [npmjs][author-npmjs] - [website][author-website]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][author-website], [contributors](https://github.com/tunnckoCore/koa-better-body/graphs/contributors).  
Released under the [`MIT`][license-url] license.

***
_Project generated with `Metalify` June 25, 2014._

[npmjs-url]: https://npm.im/koa-better-body
[npmjs-img]: http://img.shields.io/npm/v/koa-better-body.svg
[npmjs-install]: https://nodei.co/npm/koa-better-body.png?mini=true

[license-url]: https://github.com/tunnckoCore/koa-better-body/blob/master/license.md
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg

[travis-url]: https://travis-ci.org/tunnckoCore/koa-better-body
[travis-img]: https://travis-ci.org/tunnckoCore/koa-better-body.png?branch=master

[depstat-url]: https://david-dm.org/tunnckoCore/koa-better-body
[depstat-img]: https://david-dm.org/tunnckoCore/koa-better-body.png

[author-gittip-img]: http://img.shields.io/gittip/tunnckoCore.svg
[author-gittip]: https://www.gittip.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore

[author-website]: http://www.whistle-bg.tk
[author-npmjs]: https://npmjs.org/~tunnckocore
