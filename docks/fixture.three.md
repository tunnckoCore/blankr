## API
### Table of contents
- [module.exports()](#moduleexports)

### module.exports()
**Examples**
For a more comprehensive examples, see [examples](./examples) folder.
- [`examples/multer`](./examples/multer.js) - usage like Express's bodyParser - [multer][multer-url] `npm run examples-multer`
- [`examples/koa-router`](./examples/koa-router.js) - usage with Alex's [koa-router][koa-router-url] `npm run examples-koa-router`


**Options**
However, `koa-better-body` have few custom options, see also [co-body][cobody-url], [raw-body][rawbody-url], [formidable][formidable-url]

- ``patchNode`` **{Boolean}** Patch request body to Node's `ctx.req` object, default `false`
- ``patchKoa`` **{Boolean}** Patch request body to Koa's `ctx.request` object, default `true`
- ``jsonLimit`` **{String|Number}** The byte limit of the JSON body, default `1mb`
- ``formLimit`` **{String|Number}** The byte limit of the form body, default `56kb`
- ``encoding`` **{String}** Sets encoding for incoming form fields, default `utf-8`
- ``multipart`` **{Boolean}** Support `multipart/form-data` request bodies, default `false`
- ``formidable`` **{Object}** Options that are passing to `formidable`
- ``formidable.maxFields`` **{Number}** See [formidable-options](./readme.md#formidable-options). our default `10`
- ``formidable.multiples`` **{Boolean}** See [formidable-options](./readme.md#formidable-options), our default `true`
- ``formidable.keepExtensions`` **{Boolean}** See [formidable-options](./readme.md#formidable-options), our default `true`
- `return` **{GeneratorFunction}** That you can use with [koa][koa-url] or [co][co-url]

**Source:**
```js
module.exports = function koaBody(options) {
  var opts = xtend(true, defaultOptions, options || {});
  
  return function* koaBody(next){
    var body = {}, json, form;
    if (this.request.is('json'))  {
      json = yield buddy.json(this, {encoding: opts.encoding, limit: opts.jsonLimit});
      body.fields = json;
    }
    else if (this.request.is('urlencoded')) {
      form = yield buddy.form(this, {encoding: opts.encoding, limit: opts.formLimit});
      body.fields = form;
    }
    else if (this.request.is('multipart') && opts.multipart) {
      body = yield formy(this, opts.formidable);
    }

    if (opts.patchNode) {
      this.req.body = body;
    }
    if (opts.patchKoa) {
      this.request.body = body;
    }
    yield next;
  };
};

