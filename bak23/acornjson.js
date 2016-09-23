'use strict'

// var json = `{
//   name: 'json5',
//   main: "lib/json5.js",
//   bin: 'lib/cli.js',
//   foo: true,
//   bar-qux: 123,
//   data: .31,
//   homepage: 'http://json5.org/',
//   "license": /* foo */ 'MIT',
//   repository: {
//     type: 'git', // bar
//     url: 'https://github.com/aseemk/json5.git', /* foo */
//   },
//   // foobar
//   files: ["lib/"],
//   "devDependencies": {
//     gulp: "^3.9.1",
//     'gulp-jshint': "^2.0.0",
//     jshint: "^2.9.1",
//     'jshint-stylish': "^2.1.0",
//     mocha: "^555",
//   },
//   /*
//     some multiline
//     comment here
//    */
//   scripts: {
//     build: 'node ./lib/cli.js -c package.json5',
//     test: 'mocha --ui exports --reporter spec',
//     // TODO: Would it be better to define these in a mocha.opts file?
//   },
// }`

var css = `:root {
  clr: #edc6ea;
  radius: 5px;
}

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -o-border-radius: $radius;
  border-radius: $radius;
}

ul {
  padding: 123px;
  font-family: Arial;
}
h3 {
  padding: 123px;
  font-family: Arial;
}
ul {
  color: #ef3;
  font-family: Hanover;
}
h2 {
  color: #ef3;
  font-family: Hanover;
}

ul li > div {
  border-radius: radius;
  font-size: size;
  color: clr;
  border-radius: 12px;
  foo: {
    bar: qux zet bath
  }
}

ul li > div a.btn .big {
  color: black;
}

ul li > div a.click .something .bg {
  border-radius: radius;
  background: teal;
}`

var balanced = require('balanced-match')

function hicks(res, json) {
  var before = res.pre.replace(/[\r\n]*/g, '').trim();
  var body = res.body.replace(/[\r\n]*/g, '').trim();

  json[before] = {};

  body.split(',').filter(Boolean).forEach(function(decl) {
    var keyEnd = decl.indexOf(':');
    var key = decl.slice(0, keyEnd).trim();
    var val = decl.slice(keyEnd+1, decl.length).trim();
    json[before][key] = val;
  });
}

function hicks(res, json) {
  var before = res.pre.replace(/[\r\n]*/g, '').trim();
  var body = res.body.replace(/[\r\n]*/g, '').trim();

  json[before] = {};

  body.split(';').filter(Boolean).forEach(function(decl) {
    var keyEnd = decl.indexOf(':');
    var key = decl.slice(0, keyEnd).trim();
    var val = decl.slice(keyEnd+1, decl.length).trim();
    if (val.indexOf('{') !== -1 && val.indexOf('}') !== -1) {
      res = balanced('{', '}', val)
      hicks(res, json)
      return
    }
    json[before][key] = val;
  });
}

var json = {};
var res = balanced('{', '}', css);

if (!json.length) {
  hicks(res, json);
}

while ((res.post.indexOf('{') !== -1) && (res.post.indexOf('}') !== -1)) {
  res = balanced('{', '}', res.post);
  hicks(res, json);
}

console.log(JSON.stringify(json, 0, 2));
