# dush-router [![NPM version](https://img.shields.io/npm/v/dush-router.svg?style=flat)](https://www.npmjs.com/package/dush-router) [![github tags][ghtag-img]][ghtag-url] [![mit license][license-img]][license-url]

> A simple regex-based router for `dush`, `base`, `minibase` and anything based on them. Works on Browser and Node.js

_You might also be interested in [dush-no-chaining][], [dush-methods][] and [dush-tap-report][], 
a plugins for [dush][] microscopic event emitter with simple & powerful plugin system._

## Quality

[![code climate][codeclimate-img]][codeclimate-url] 
[![code style][standard-img]][standard-url] 
[![commitizen friendly][czfriendly-img]][czfriendly-url] 
[![dependencies][daviddm-deps-img]][daviddm-deps-url] 
[![develop deps][daviddm-devdeps-img]][daviddm-devdeps-url] 

## Stability

> By following [Semantic Versioning]() through [standard-version]() releasing tool, 
this package is very stable and its tests are passing both on [Windows (AppVeyor)]() 
and [Linux (CircleCI)]() with results from 100% to [400%]() test coverage, reported respectively
by [CodeCov]() and [nyc (istanbuljs)]().

[![follows semver][semver-img]][semver-url] 
[![semantic releases][strelease-img]][strelease-url] 
[![linux build][circle-img]][circle-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![code coverage][codecov-img]][codecov-url] 

## Support

[![tunnckoCore support][supportchat-img]][supportchat-url] 
[![code mentor][codementor-img]][codementor-url] 
[![paypal donate][paypalme-img]][paypalme-url] 
[![NPM monthly downloads](https://img.shields.io/npm/dm/dush-router.svg?style=flat)](https://npmjs.org/package/dush-router) 
[![npm total downloads][downloads-img]][downloads-url] 

## Highlights :sparkles:
- **Small:** Really small and lightweight
- **Easy:** Regex-based routing, for simple cases
- **Extensible:** Can use [path-match][] under the hood
- **Isomorphic:** For the browser or Node.js >= v0.10
- **Customize:** Control over route handler's arguments
- **Great:** Sane and good defaults, but easy to customize
- **Simple:** Based on awesome event system like [dush][]
- **Stable:** Well tested, with [400% coverage](./package.json#L55-L61)
- **Modern:** Plays well with [nanomorph][], [bel][] or any other thing
- **Allows:** Adding multiple handlers on same route

## Table of Contents
<!-- toc -->

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install {%= name %} --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add {%= name %}
```

## Usage
> For more use-cases see the [tests](test.js)

```js
const {%= varname %} = require('{%= name %}')
```

## API
{%= apidocs('index.js') %}

## Notes

### About "on route"

You can customize everything. By default, we call the route handler with single "context" object
which contains `.route`, `.pathname`, `.params` and `.state` properties.

- `route` - the route of the handler, e.g. `/user/:id`
- `pathname` - the incoming url - 1st argument of `.navigate` method, e.g. `/user/charlike`
- `state` - optional "state" for the page - 2nd argument of `.navigate` method, e.g. `{ foo: 1 }`
- `params` - object, containing the params of the route, e.g. `{ id: 'charlike' }`

But instead of this you may want to pass more additional arguments to route handler or include 
only few of these above. To do this you can `off` the default `.on('route')` logic and provide
a new logic. The listener of `route` event will be passed with `(handler, context, el)` signature.
Where `handler` is the route handler function, `context` is the above context object, and `el` can be
the "previous" returned value of the handler call (it is useful for diffing).

In above API docs have existing example, but let's try it again.

```js
// remove the defafult
app.off('route')
```

Okey, let's say we want our route handlers to have `(params, actions)` signature.
We can get the first from the "context" object, but what about "actions". Let's think
 of the route handler as _"view"_, so we want to pass some actions to be done on some scenario.

> _**Tip:** This is the perfect place to plug in a virtual or real dom diffing algorithm! You
definitely should try to use [nanomorph][] here to see the magic! :)_ 

```js
const actions = {
  hi: (name) => alert('hi ' + name)
}

app.on('route', (handler, context) => {
  return handler(context.params, actions)
})
```


Now, let's define our simple view with [bel][], a simple DOM builder using tagged template strings.

```js
const html = require('bel')

app.addRoute('/hello/:name', (params, actions) => {
  return html`<div>
    <h1>Hello ${params.name}</h1>
    <button onclick=${() => actions.hi(params.name)}>Click me to alert you</button>
  </div>`
})
```

This view just outputs one heading and a button, which when is clicked will say "hi" to different persons,
based on the passed url, which in our case will be fired with `.navigate` method.

```js
const res = app.navigate('/hello/charlike')

console.log(res) // => DOM element
console.log(res.toString())
// =>
// <div>
//   <h1>Hello charlike</h1>
//   <button>Click me to alert you</button>
// </div>
```

And because `.navigate` method returns what is returned value from the matched route, we can
easy get the rendered page.

### About routing

By default we use _really simple_ approach for covering most common and simple cases. It is similar
to what we see in Express app's routing, where `:name` is a placeholder for some param.

But because everything is some simple, small and pluggable, you can create another plugin
that provide a different `.createRoute` method, for example using [path-match][]. There's 
only few things that you should follow and they can be seen in the source code, 
it is pretty small and easy to understand.

{% if (verb.related && verb.related.list && verb.related.list.length) { %}
## Related
{%= related(verb.related.list, {words: 20}) %}
{% } %}

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/{%= repository %}/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
{%= includeEither('authors', 'author') %}
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
{%= copyright({ start: 2017, linkify: true, prefix: 'Copyright', symbol: '©' }) %} {%= licenseStatement %}

***

{%= include('footer') %}  
_Project scaffolded using [charlike][] cli._

{%= reflinks(verb.reflinks) %}

[license-url]: https://www.npmjs.com/package/{%= name %}
[license-img]: https://img.shields.io/npm/l/{%= name %}.svg

[downloads-url]: https://www.npmjs.com/package/{%= name %}
[downloads-img]: https://img.shields.io/npm/dt/{%= name %}.svg

[codeclimate-url]: https://codeclimate.com/github/{%= repository %}
[codeclimate-img]: https://img.shields.io/codeclimate/github/{%= repository %}.svg

[circle-url]: https://circleci.com/gh/{%= repository %}
[circle-img]: https://img.shields.io/circleci/project/github/{%= repository %}/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/{%= name %}
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/{%= name %}/master.svg?label=windows

[codecov-url]: https://codecov.io/gh/{%= repository %}
[codecov-img]: https://img.shields.io/codecov/c/github/{%= repository %}/master.svg

[daviddm-deps-url]: https://david-dm.org/{%= repository %}
[daviddm-deps-img]: https://img.shields.io/david/{%= repository %}.svg

[daviddm-devdeps-url]: https://david-dm.org/{%= repository %}?type=dev
# dush-router [![NPM version](https://img.shields.io/npm/v/dush-router.svg?style=flat)](https://www.npmjs.com/package/dush-router) [![github tags][ghtag-img]][ghtag-url] [![mit license][license-img]][license-url]

> A simple regex-based router for `dush`, `base`, `minibase` and anything based on them. Works on Browser and Node.js

_You might also be interested in [dush-no-chaining][], [dush-methods][] and [dush-tap-report][], 
a plugins for [dush][] microscopic event emitter with simple & powerful plugin system._

## Quality

[![code climate][codeclimate-img]][codeclimate-url] 
[![code style][standard-img]][standard-url] 
[![commitizen friendly][czfriendly-img]][czfriendly-url] 
[![dependencies][daviddm-deps-img]][daviddm-deps-url] 
[![develop deps][daviddm-devdeps-img]][daviddm-devdeps-url] 

## Stability

By following [Semantic Versioning]() through [standard-version]() releasing tool, maintaining
a meaningful [ChangeLog]() and commit history - based on [global conventions](), 
we provide very stable builds with [~ 400%]() of [nyc]() and 100% on [CodeCov]() test coverages
that _Just Works ™_ both on [Windows (AppVeyor)]() and [Linux (CircleCI)]().

[![follows semver][semver-img]][semver-url] 
[![semantic releases][strelease-img]][strelease-url] 
[![linux build][circle-img]][circle-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![code coverage][codecov-img]][codecov-url] 

## Support

[![tunnckoCore support][supportchat-img]][supportchat-url] 
[![code mentor][codementor-img]][codementor-url] 
[![paypal donate][paypalme-img]][paypalme-url] 
[![NPM monthly downloads](https://img.shields.io/npm/dm/dush-router.svg?style=flat)](https://npmjs.org/package/dush-router) 
[![npm total downloads][downloads-img]][downloads-url] 

## Highlights :sparkles:
- **Small:** Really small and lightweight
- **Easy:** Regex-based routing, for simple cases
- **Extensible:** Can use [path-match][] under the hood
- **Isomorphic:** For the browser or Node.js >= v0.10
- **Customize:** Control over route handler's arguments
- **Great:** Sane and good defaults, but easy to customize
- **Simple:** Based on awesome event system like [dush][]
- **Stable:** Well tested, with [400% coverage](./package.json#L55-L61)
- **Modern:** Plays well with [nanomorph][], [bel][] or any other thing
- **Allows:** Adding multiple handlers on same route

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
  * [router()](#router)
  * [.addRoute](#addroute)
  * [.createRoute](#createroute)
  * [.navigate](#navigate)
- [Notes](#notes)
  * [About "on route"](#about-on-route)
  * [About routing](#about-routing)
- [Related](#related)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install dush-router --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add dush-router
```

## Usage
> For more use-cases see the [tests](test.js)

```js
const dushRouter = require('dush-router')
```

## API

### [router()](index.js#L37)
A plugin that adds `.createRoute`, `.addRoute` and `.navigate` methods for any app based on [dush][], [base][] or [minibase][]. Notice that this plugin emit events - `route` if match, and `notFound` if not route found on defined routes.

**Params**

* `opts` **{Object}**: no options currently    
* `returns` **{Function}**: a plugin function which should be passed to `.use` method  

**Example**

```js
var dush = require('dush')
var router = require('dush-router')

var app = dush()
app.use(router())

console.log(app._routes) // => []
console.log(app.createRoute) // => function
console.log(app.addRoute) // => function
console.log(app.navigate) // => function
```

### [.addRoute](index.js#L85)
> Add/register an actual `route` with `handler` to the `app._routes` array. It uses `.createRoute` method to create an "route" object that is then pushed to `app._routes`.

_**Note:** If route handler returns something the `app.navigate` method
will return that exact value on route match._

**Params**

* `route` **{String}**: a simple route, express-like definition, e.g. `/user/:id`    
* `handler` **{Function}**: a function to be called when `route` match    
* `returns` **{Object}**: instance for chaining  

**Example**

```js
app.addRoute('/foobar', (context) => {
  console.log('state:', context.state) // => { hello: 'world' }
  console.log('params:', context.params) // => {}
  console.log('route:', context.route) // => '/foobar'
  console.log('pathname:', context.pathname) // => '/foobar'
})

app.navigate('/foobar', { hello: 'world' })

// or with params
app.addRoute('/user/:id', ({ state, params, route, pathname }) => {
  console.log('Hello ', state.username) // => 'Hello Charlike'
  console.log('Your ID is', params.id) // => 'Your ID is 123'

  console.log('route', route) // => '/user/:id'
  console.log('path', pathname) // => '/user/123'
})

app.navigate('/user/123', { username: 'Charlike' })
```

### [.createRoute](index.js#L142)
> Just create a `route` with `handler`, same as `.addRoute` method, but without adding it to `app._routes` array. This "route" object contains `.match`, `.regex`, `.route` and `.handler` properties. Where `.match` is a function that accepts single argument "pathname" to check against given `route`, `.handler` is the passed `handler` function, `.regex` is the generated regex for that `route` string and the `.route` is the given `route`. The `.match` function returns `null` if passed "pathname" string match to the given `route` but not params and `false` if passed "pathname" not match.

_**Note:** This method does not call the given route handler._

**Params**

* `route` **{String}**: a simple route, express-like definition, e.g. `/user/:id`    
* `handler` **{Function}**: a function to be called when `route` match    
* `returns` **{Object}**: a "route" object with few properties  

**Example**

```js
const r = app.createRoute('/user/:id', function abc (params) {
  console.log('hi user with id:', params.id)
})

console.log(r.match) // => function
console.log(r.handler) // => function
console.log(r.handler.name) // => 'abc'
console.log(r.route) // => '/user/:id'
console.log(r.regex) // => /^\/user\/(\w+)$/i

var params = r.match('/user/123')
console.log(params) // => { id: 123 }

// manually call the route handler
if (params !== false) {
  r.handler(params || {})
}

// not match, so returns `false`
params = r.match('/foobar')
console.log(params) // => false

var route = app.createRoute('/foobie', () => {})

// match, but no params, so return `null`
var res = route.match('/foobie')
console.log(res) // => null
```

### [.navigate](index.js#L199)
> Manually navigate to some route with url `pathname` and returns what the route handler returns. You can pass a custom `state` which will be passed to route handler's context as `context.state`. This method fires `notFound` event when not found match, and `route` when find a route.

**Params**

* `pathname` **{String}**: a url to navigate to    
* `state` **{any}**: optionally pass a "state", passed to route's handler    
* `returns` **{any}**: basically returns what the route handler return  

**Example**

```js
app.on('notFound', (context) => {
  console.log(`sorry ${context.pathname} page not exist`)
  console.log('this is incoming state:', context.state)
})
app.navigate('/foo/bar/qux', { aa: 11 })

app.addRoute('/hello/:place', (context) => {
  console.log('hi', context.params.place) // => 'hi world'
})
app.navigate('/hello/world')

// remove default "on route" handler
app.off('route')

// and define your custom one,
// to change route handler arguments
app.on('route', (handler, context) => {
  return handler(context.state, context.params)
})

// notice the handler signature, it's different than
// the default one seen in above `/hello/:place` route
app.addRoute('/user/:name', (state, params) => {
  var name = state.username || params.name

  console.log('name:', name) // => 'name: john' or 'name: charlike'

  return name
})

// it returns what the route handler return
var res = app.navigate('/user/john')
console.log(res) // => 'john', because there's no passed state

var ret = app.navigate('/user/hey', { username: 'charlike '})
console.log(ret) // => 'charlike'
```

## Notes

### About "on route"

You can customize everything. By default, we call the route handler with single "context" object
which contains `.route`, `.pathname`, `.params` and `.state` properties.

- `route` - the route of the handler, e.g. `/user/:id`
- `pathname` - the incoming url - 1st argument of `.navigate` method, e.g. `/user/charlike`
- `state` - optional "state" for the page - 2nd argument of `.navigate` method, e.g. `{ foo: 1 }`
- `params` - object, containing the params of the route, e.g. `{ id: 'charlike' }`

But instead of this you may want to pass more additional arguments to route handler or include 
only few of these above. To do this you can `off` the default `.on('route')` logic and provide
a new logic. The listener of `route` event will be passed with `(handler, context, el)` signature.
Where `handler` is the route handler function, `context` is the above context object, and `el` can be
the "previous" returned value of the handler call (it is useful for diffing).

In above API docs have existing example, but let's try it again.

```js
// remove the defafult
app.off('route')
```

Okey, let's say we want our route handlers to have `(params, actions)` signature.
We can get the first from the "context" object, but what about "actions". Let's think
 of the route handler as _"view"_, so we want to pass some actions to be done on some scenario.

> _**Tip:** This is the perfect place to plug in a virtual or real dom diffing algorithm! You
definitely should try to use [nanomorph][] here to see the magic! :)_ 

```js
const actions = {
  hi: (name) => alert('hi ' + name)
}

app.on('route', (handler, context) => {
  return handler(context.params, actions)
})
```

Now, let's define our simple view with [bel][], a simple DOM builder using tagged template strings.

```js
const html = require('bel')

app.addRoute('/hello/:name', (params, actions) => {
  return html`<div>
    <h1>Hello ${params.name}</h1>
    <button onclick=${() => actions.hi(params.name)}>Click me to alert you</button>
  </div>`
})
```

This view just outputs one heading and a button, which when is clicked will say "hi" to different persons,
based on the passed url, which in our case will be fired with `.navigate` method.

```js
const res = app.navigate('/hello/charlike')

console.log(res) // => DOM element
console.log(res.toString())
// =>
// <div>
//   <h1>Hello charlike</h1>
//   <button>Click me to alert you</button>
// </div>
```

And because `.navigate` method returns what is returned value from the matched route, we can
easy get the rendered page.

### About routing

By default we use _really simple_ approach for covering most common and simple cases. It is similar
to what we see in Express app's routing, where `:name` is a placeholder for some param.

But because everything is some simple, small and pluggable, you can create another plugin
that provide a different `.createRoute` method, for example using [path-match][]. There's 
only few things that you should follow and they can be seen in the source code, 
it is pretty small and easy to understand.

## Related
- [dush-methods](https://www.npmjs.com/package/dush-methods): Plugin for `dush` and anything based on it. It adds helper `.define` and `.delegate` methods | [homepage](https://github.com/tunnckocore/dush-methods#readme "Plugin for `dush` and anything based on it. It adds helper `.define` and `.delegate` methods")
- [dush-no-chaining](https://www.npmjs.com/package/dush-no-chaining): A plugin that removes the emitter methods chaining support for `dush`, `base`, `minibase` or anything based on them | [homepage](https://github.com/tunnckocore/dush-no-chaining#readme "A plugin that removes the emitter methods chaining support for `dush`, `base`, `minibase` or anything based on them")
- [dush-tap-report](https://www.npmjs.com/package/dush-tap-report): A simple TAP report producer based on event system. A plugin for `dush` event emitter or anything based on it | [homepage](https://github.com/tunnckocore/dush-tap-report#readme "A simple TAP report producer based on event system. A plugin for `dush` event emitter or anything based on it")
- [dush](https://www.npmjs.com/package/dush): Microscopic & functional event emitter in ~260 bytes, extensible through plugins. | [homepage](https://github.com/tunnckocore/dush#readme "Microscopic & functional event emitter in ~260 bytes, extensible through plugins.")
- [minibase-create-plugin](https://www.npmjs.com/package/minibase-create-plugin): Utility for [minibase][] and [base][] that helps you create plugins | [homepage](https://github.com/node-minibase/minibase-create-plugin#readme "Utility for [minibase][] and [base][] that helps you create plugins")
- [minibase-is-registered](https://www.npmjs.com/package/minibase-is-registered): Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and… [more](https://github.com/node-minibase/minibase-is-registered#readme) | [homepage](https://github.com/node-minibase/minibase-is-registered#readme "Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if named plugin is already registered on the instance.")
- [minibase](https://www.npmjs.com/package/minibase): Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/dush-router/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2017, [Charlike Mike Reagent](https://i.am.charlike.online). Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 29, 2017._  
_Project scaffolded using [charlike][] cli._

[always-done]: https://github.com/hybridables/always-done
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[bel]: https://github.com/shama/bel
[charlike]: https://github.com/tunnckocore/charlike
[commitizen]: https://github.com/commitizen/cz-cli
[dezalgo]: https://github.com/npm/dezalgo
[dush-methods]: https://github.com/tunnckocore/dush-methods
[dush-no-chaining]: https://github.com/tunnckocore/dush-no-chaining
[dush-tap-report]: https://github.com/tunnckocore/dush-tap-report
[dush]: https://github.com/tunnckocore/dush
[minibase]: https://github.com/node-minibase/minibase
[nanomorph]: https://github.com/yoshuawuyts/nanomorph
[once]: https://github.com/isaacs/once
[path-match]: https://github.com/pillarjs/path-match
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[license-url]: https://www.npmjs.com/package/dush-router
[license-img]: https://img.shields.io/npm/l/dush-router.svg

[downloads-url]: https://www.npmjs.com/package/dush-router
[downloads-img]: https://img.shields.io/npm/dt/dush-router.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/dush-router
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/dush-router.svg

[circle-url]: https://circleci.com/gh/tunnckoCore/dush-router
[circle-img]: https://img.shields.io/circleci/project/github/tunnckoCore/dush-router/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/dush-router
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/dush-router/master.svg?label=windows

[codecov-url]: https://codecov.io/gh/tunnckoCore/dush-router
[codecov-img]: https://img.shields.io/codecov/c/github/tunnckoCore/dush-router/master.svg

[daviddm-deps-url]: https://david-dm.org/tunnckoCore/dush-router
[daviddm-deps-img]: https://img.shields.io/david/tunnckoCore/dush-router.svg

[daviddm-devdeps-url]: https://david-dm.org/tunnckoCore/dush-router?type=dev
[daviddm-devdeps-img]: https://img.shields.io/david/dev/tunnckoCore/dush-router.svg

[ghtag-url]: https://github.com/tunnckoCore/dush-router/releases/tag/v1.0.1
[ghtag-img]: https://img.shields.io/github/tag/tunnckoCore/dush-router.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[paypalme-url]: https://www.paypal.me/tunnckoCore
[paypalme-img]: https://img.shields.io/badge/paypal-donate-brightgreen.svg

[czfriendly-url]: http://commitizen.github.io/cz-cli
[czfriendly-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[codementor-url]: https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github
[codementor-img]: https://img.shields.io/badge/code%20mentor-tunnckoCore-brightgreen.svg

[semver-url]: http://semver.org
[semver-img]: https://img.shields.io/badge/following-semver-brightgreen.svg

[strelease-url]: https://github.com/conventional-changelog/standard-version
[strelease-img]: https://img.shields.io/badge/using-standard%20version-brightgreen.svg

[supportchat-url]: https://gitter.im/tunnckoCore/support
[supportchat-img]: https://img.shields.io/gitter/room/tunnckoCore/support.svg

[_changelog-url]: https://github.com/tunnckoCore/dush-router/blob/master/CHANGELOG.md











Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation

add - brightgreen 
fix - yellow 
remove - red 
update - orange 
<div style="color: white; background: black;">#940058c</div>

[![][940058c-img]][940058c-url] - add  
[![][71b7d47-img]][71b7d47-url] - fix  
[![][b0ce680-img]][b0ce680-url] - add  
[![][cc6c2e2-img]][cc6c2e2-url] - remove  
[![][5661e96-img]][5661e96-url] - update    


[tunnckoCore]: https://github.com/tunnckoCore

[940058c-img]:https://img.shields.io/badge/%23940058c-adds-brightgreen.svg?style=flat
[940058c-url]: https://github.com/tunnckoCore/dotfiles/commit/940058c

[71b7d47-img]:https://img.shields.io/badge/%2371b7d47-fixes-yellow.svg?style=flat
[71b7d47-url]: https://github.com/tunnckoCore/dotfiles/commit/71b7d47

[b0ce680-img]:https://img.shields.io/badge/%23b0ce680-adds-brightgreen.svg?style=flat
[b0ce680-url]: https://github.com/tunnckoCore/dotfiles/commit/b0ce680

[cc6c2e2-img]:https://img.shields.io/badge/%23cc6c2e2-removes-red.svg?style=flat
[cc6c2e2-url]: https://github.com/tunnckoCore/dotfiles/commit/cc6c2e2

[5661e96-img]:https://img.shields.io/badge/%235661e96-update-blue.svg?style=flat
[5661e96-url]: https://github.com/tunnckoCore/dotfiles/commit/5661e96




- [ ] [amxx] headshot mod
- [ ] [amxx] giga, mega, super sounds - ultra configurable via cvars and config file
- [ ] [book] semantic seo book @ gitbook (bg, en?)
- [x] [misc] return to linux (work/nodejs) ~~as dual-boot with win7 (games: LoL/CS)~~
- [x] [node] readdir streamable (50-100 lines, very basic core of next modules)
- [x] [node] few new modules in mind
- [x] [node] randomjs-org update, solving some issues
- [ ] [node] docks and ock.js
- [ ] [node] prodown wip - one more markdown module - CommonMark compitable, extendable
- [x] [node] [pkg-open](https://github.com/tunnckoCore/pkg-open) / [homepage](https://github.com/tunnckoCore/homepage) - simple, better url opener - using @sindresorhus's opn
- [z] [node] full reviewing of @jonschlinkert's modules, suggestions, collaboration
- [ ] [node] node-task spec
- [x] [node] useful regexp's? [RegExps Organization](https://github.com/regexps)
- [x] [node] gitter cli - port for node.js
- [ ] [php] php projects docs, refactoring, code comments
- [ ] [node] MV*? / SPA / framework?, without jQuery - gator.js (events), page.js (routing) - same approach - [Frameworkless JS](https://muut.com/blog/technology/frameworkless-javascript.html)
- [ ] [misc] register whistle-bg.tk domain - 8 euro (forgot to renew, wtf)
- [x] [node] full featured github based blog system (like prose.io?, plugins?, github/fb/g+/disqus comments?)
  - "Blogging platform, engine, service - Github-hosted and Javascript-powered" - [draft as issue](https://github.com/tunnckoCore/blankr/issues/1)
- [x] [node] more ideas and drafts can find in [issue tracker](https://github.com/tunnckoCore/blankr/issues)

------

http://www.ongamers.com/articles/top-ten-counter-strike-1-0-to-1-6-players-who-could-have-been-the-greatest-of-all-time/1100-846

------

bg-best.info - Безплатни домейни от СуперХостинг.БГ
bg-best.info е форум, който има за цел да предостави на своите потребители безплатни домейни срещу точки, които се печелят с писане на мнения и теми. Форумът стартира на 13 май 2007 и досега(01 март 2008) има 1241 регистрирани потребители и 104146

------
http://mywebtrip.wordpress.com/2008/09/23/bg-bestinfo-%D0%B1%D0%B5%D0%B7%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%B8-%D0%B4%D0%BE%D0%BC%D0%B5%D0%B9%D0%BD%D0%B8/:
BG-Best.Info е форум в който съм редовен поради длъжността си. Като казах „поради длъжността си“ исках да кажа, че съм глобален модератор и няма как да не съм редовен. В форума съм вече от година и половина близо и вече взе да ми омръзва, но като по навик си влизам и си разглеждам темите с удоволствие. В него можете да вземете безплатни домейни .com/.net./.org/.info от superhosting.bg, като пишете в форума и от самите постове ви се натрупват точки чрез които можете да си поръчате по-горе посочените домейни. Също така търговията с точки е доста добра. Тоест ако не искате домейн, а форума ви харесва, може да се регистрирате просто за да ви правят хедъри, банери, аватари и други услуги срещу точки. Също така можете да релаксирате след дългият работен ден в субфорума „Лафче“, където някой път можете да срещнете и доста излишен спам. Това е от мен!



