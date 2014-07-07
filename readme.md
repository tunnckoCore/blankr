## API
### Table of contents
- [Application()](#application)
- [app.listen()](#applisten)
- [app.toJSON()](#apptojson)
- [app.use()](#appuse)
- [app.callback()](#appcallback)

### Application()
Initialize a new `Application`.


**Source:**
```js
function Application() {
  if (!(this instanceof Application)) return new Application;
  this.env = process.env.NODE_ENV || 'development';
  this.subdomainOffset = 2;
  this.poweredBy = true;
  this.middleware = [];
  this.context = Object.create(context);
  this.request = Object.create(request);
  this.response = Object.create(response);
}
```

### app.listen()
Shorthand for:

   http.createServer(app.callback()).listen(...)

- `...` **{Mixed}** 
- `return` **{Server}**

**Source:**
```js
app.listen = function(){
  debug('listen');
  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};
```

### app.toJSON()
Return JSON representation.

- `return` **{Object}**

**Source:**
```js
app.toJSON = function(){
  return only(this, [
    'subdomainOffset',
    'poweredBy',
    'env'
  ]);
};
```

### app.use()
Use the given middleware `fn`.

- `fn` **{GeneratorFunction}** 
- `return` **{Application}** self

**Source:**
```js
app.use = function(fn){
  assert('GeneratorFunction' == fn.constructor.name, 'app.use() requires a generator function');
  debug('use %s', fn._name || fn.name || '-');
  this.middleware.push(fn);
  return this;
};
```

### app.callback()
Return a request handler callback
for node's native http server.

- `return` **{Function}**

**Source:**
```js
app.callback = function(){
  var mw = [respond].concat(this.middleware);
  var gen = compose(mw);
  var fn = co(gen);
  var self = this;

  if (!this.listeners('error').length) this.on('error', this.onerror);

  return function(req, res){
    res.statusCode = 404;
    var ctx = self.createContext(req, res);
    finished(ctx, ctx.onerror);
    fn.call(ctx, ctx.onerror);
  }
};
```
