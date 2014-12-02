gulp-j140 [![Build Status](https://travis-ci.org/tunnckoCore/gulp-j140.png)](https://travis-ci.org/tunnckoCore/gulp-j140) [![Dependencies Status](https://david-dm.org/tunnckoCore/gulp-j140/status.svg)](https://david-dm.org/dlau/gulp-j140) [![Coverage Status](https://coveralls.io/repos/tunnckoCore/gulp-j140/badge.png?branch=master)](https://coveralls.io/r/tunnckoCore/gulp-j140?branch=master)
================

> Compile [j140 templates](https://github.com/tunnckoCore/j140). Gulp plugin for j140 - Javascript template engine in 140 bytes, by Jed Schmidt.


## Install
> Install [`package/gulp-j140`](http://npm.im/gulp-j140) with [npm](https://npmjs.org)

```
$ npm install gulp-j140
```


## Usage

#### `src/greeting.html`

```html
<h1>Hello #{this.name}</h1>
```

#### `gulpfile.js`

```js
var gulp = require('gulp');
var template = require('gulp-template');

gulp.task('default', function () {
  return gulp.src('src/greeting.html')
    .pipe(template({name: 'Charlike'}))
    .pipe(gulp.dest('dist'));
});
```

#### `dist/greeting.html`

```html
<h1>Hello Charlike</h1>
```

## Mocha (test), Istanbul (coverage), JSHint (lint)
> You can run it through `npm run`

```
$ npm test
$ npm run cov
$ npm run lint
```
or through `make` file
```
$ make test
$ make cov
$ make lint
```

## License
The MIT License, 2014 [Charlike Mike Reagent](https://github.com/tunnckoCore) ([@tunnckoCore](https://twitter.com/tunnckoCore))
***
_This file was rebuild with [`Ock`](https://github.com/tosckjs/ock) on June 21, 2014._