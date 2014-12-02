var jed = require('./index'),
    times = 50000;

console.log('rendering from string ' + times + ' times');
var start = process.hrtime();
while (times--) {
  jed("Test #{this.state || 'pass'}", {state: 'complete'});
}
var end = process.hrtime(start);
console.log('took ' + (end[0] + end[1] / 1e9) + 's');
