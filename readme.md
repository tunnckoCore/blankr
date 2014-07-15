## API
### Table of Contents
- [RandomJs([body, statusCb])](#randomjsbody-statuscb)
- [RandomJs#request([statusCb])](#randomjsprototyperequeststatuscb)
- [RandomJs#apikey(apikey[, statusCb])](#randomjsprototypeapikeyapikey-statuscb)
- [RandomJs#jsonrpc(jsonrpc[, statusCb])](#randomjsprototypejsonrpcjsonrpc-statuscb)
- [RandomJs#method(method[, statusCb])](#randomjsprototypemethodmethod-statuscb)
- [RandomJs#params(params[, statusCb])](#randomjsprototypeparamsparams-statuscb)
- [RandomJs#id(id[, statusCb])](#randomjsprototypeidid-statuscb)
- [RandomJs#url(url[, statusCb])](#randomjsprototypeurlurl-statuscb)
- [RandomJs#uri(uri[, statusCb])](#randomjsprototypeuriuri-statuscb)
- [RandomJs#callback(fn[, statusCb])](#randomjsprototypecallbackfn-statuscb)
- [RandomJs#headers(headers[, statusCb])](#randomjsprototypeheadersheaders-statuscb)
- [RandomJs#post(done[, statusCb])](#randomjsprototypepostdone-statuscb)

### RandomJs([body, statusCb])
Initialize a new `RandomJs` instance with `body` object.

- `[body]` **{Object}** (optional) body object that will send to api
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
function RandomJs(body, statusCb) {
  if (!(this instanceof RandomJs)) {return new RandomJs(body, statusCb);}
  body = body || {};
  this._request = {};
  this._response = {};
  this._callback = function() {};

  this._url = 'https://api.random.org/json-rpc/1/invoke';

  this._request.url = this._url;
  this._request.json = true;

  this._request.body = {};
  this._request.body.jsonrpc = body.jsonrpc || '2.0';
  this._request.body.method = body.method || 'generateIntegers';
  this._request.body.params = body.params || methodDefaults.generateIntegers;
  this._request.body.id = body.id || (0 | Math.random() * 1000);
  
  this._body = this._request.body;

  if (statusCb) {statusCb(this._request);}
  return this;
}
```

### RandomJs#request([statusCb])
Get status of request that will be send to API

- `[statusCb]` **{Function}** callback that recieves 1 argument with request status
- `return` **{RandomJs}**

```js
RandomJs.prototype.request = function(statusCb) {
  statusCb(this._request);
  return this;
};
```

### RandomJs#apikey(apikey[, statusCb])
Set your API key

- `<apikey>` **{String}** you api key with that you will auth to api
- `[statusCb]` **{Function}** (optional) callback that recieves request status
- `return` **{RandomJs}**

```js
RandomJs.prototype.apikey = function(apikey, statusCb) {
  this._body.params.apiKey = apikey;
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#jsonrpc(jsonrpc[, statusCb])
Set version of Random.Org JSON RPC API

- `<jsonrpc>` **{String}** 
- `[statusCb]` **{Function}** (optional) callback that recieves request status
- `return` **{RandomJs}**

```js
RandomJs.prototype.jsonrpc = function(jsonrpc, statusCb) {
  this._body.jsonrpc = jsonrpc;
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#method(method[, statusCb])
Set which rpc method to use

- `<method>` **{String}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.method = function(method, statusCb) {
  if (methodDefaults.hasOwnProperty(method)) {
    methodDefaults[method].apiKey = this._body.params.apiKey;
    this._body.method = method;
    this._body.params = methodDefaults[method];
  }
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#params(params[, statusCb])
Set params object that will be attached to the request body

- `<params>` **{Object}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.params = function(params, statusCb) {
  if (typeof params === 'object') {
    for (var key in params) {
      if (this._body.params.hasOwnProperty(key) && this._body.params !== params[key]) {
        this._body.params[key] = params[key];
      }
    }
  }
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#id(id[, statusCb])
Set id request body

- `<id>` **{Object}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.id = function(id, statusCb) {
  this._body.id = id;
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#url(url[, statusCb])
Set url to the api endpoint
always https://api.random.org/json-rpc/1/invoke, for now

- `<url>` **{String}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.url = function(url, statusCb) {
  this._url = url;
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#uri(uri[, statusCb])
Short-hand for `.url`

- `<uri>` **{String}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.uri = function(uri, statusCb) {
  this.url(uri, statusCb);
  return this;
};
```

### RandomJs#callback(fn[, statusCb])
Callback that will handle response

- `<fn>` **{Function}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.callback = function(fn, statusCb) {
  this._callback = fn;
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#headers(headers[, statusCb])
Callback that will handle response

- `<headers>` **{Function}** 
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.headers = function(headers, statusCb) {
  this._request.headers = headers;
  this._request.headers['Content-Type'] = 'application/json';
  if (statusCb) {statusCb(this._request);}
  return this;
};
```

### RandomJs#post(done[, statusCb])
Send request to the JSON-RPC API

- `<done>` **{Function}** callback that will handle response
- `[statusCb]` **{Function}** 
- `return` **{RandomJs}**

```js
RandomJs.prototype.post = function(done, statusCb) {
  var cb = done || this._callback, finish = false;
  if (isNode && done) {
    Request.post(this._request, cb);
  } else if (isBrowser && done) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this._request.url, true);
    for (var header in this._request.headers) {
      xhr.setRequestHeader(header, this._request.headers[header]);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this._request.body));

    this._response = xhr;
    xhr.onreadystatechange = function () {
      if (!finish && xhr.readyState === 4) {
        cb(xhr, null, JSON.parse(xhr.responseText));
        finish = true;
      }
    }
  }
  if (statusCb) {statusCb(this._request);}
};


if (isNode) {
  module.exports = RandomJs;
} else {
  window.RandomJs = RandomJs;
}
//})();
```





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

soon
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
