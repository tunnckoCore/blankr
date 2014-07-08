const fs = require('fs');
const strip = require('../stripster')

function read(src) {
  var str = fs.readFileSync('./' + src,'utf-8');
  return str;
}

console.log(strip(read('test/fixtures/strip-all.js')))