# jed (j140) - 140 bytes template engine

[![Build Status](https://travis-ci.org/tunnckoCore/j140.png)](https://travis-ci.org/tunnckoCore/j140) [![Dependencies Status](https://david-dm.org/tunnckoCore/j140/status.svg)](https://david-dm.org/tunnckoCore/j140)

> Javascript template engine in 140 bytes, by Jed Schmidt

## Install

```
npm install j140
```

## Usage
For more, see `example.js` or run tests.
```js
var html = jed("Test #{this.state || 'pass'}", {state: 'complete'})
console.log(html);
// => "Test complete"

jed("Test #{this.state || 'pass'}", {state: 'async'}, function (err, data) {
  console.log(data);
  // => "Test async"
})

var html = jed("Test #{this.state || 'pass'}")
console.log(html);
// => "Test pass"
```

## Test, Bench, Example
First run `npm install` before run anything.
```
npm test
npm start
npm run bench
```

## Credit

[![Jed Schmidt](https://avatars0.githubusercontent.com/u/4433?s=144)](https://github.com/jed) | [![Charlike Mike Reagent](https://avatars2.githubusercontent.com/u/5038030?s=144)](https://github.com/tunnckoCore)
---|---
[Jed Schmidt](http://jed.is) (creator) | [George Yanev](https://github.com/tunnckoCore) (npm)


## License
Do What the Fuck You Want to Public License (WTFPL) [@jedschmidt](https://twitter.com/jedschmidt)