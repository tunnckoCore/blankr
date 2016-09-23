'use strict'

// var fs = require('fs')
// var ansi = require('ansi')
// var cursor = ansi(process.stdout)
// var extend = require('extend-shallow')
// var Benchmark = require('benchmark')

// var suite = new Benchmark.Suite({
//   onComplete: function () {
//     cursor.write('\n')
//     cursor.write('Fastest is ' + this.filter('fastest').map('name'))
//   },
// })
// var opts = {
//   onCycle: function (ev) {
//     cursor.horizontalAbsolute()
//     cursor.eraseLine()
//     cursor.write('  ' + ev.target)
//   },
//   onComplete: function () {
//     cursor.write('\n')
//   },
//   defer: true
// }

// suite
//   .add('fs.readFile', extend({}, opts, {
//     fn: function (deferred) {
//       setTimeout(function () {
//         fs.readFile('foophp.js', function (err, res) {
//           if (err) return deferred.reject(err)
//           deferred.resolve()
//         })
//       }, 200)
//     }
//   }))
//   .add('fs.readFile ctrl', extend({}, opts, {
//     fn: function (deferred) {
//       setTimeout(function () {
//         fs.readFile('ctrl.js', function (err, res) {
//           if (err) return deferred.reject(err)
//           deferred.resolve()
//         })
//       }, 100)
//     }
//   }))
//   .add('String#match', function (deferred) {
//     !!'Hello World!'.match(/o/)
//     deferred.resolve()
//   }, opts)
// // run async
// .run()


// Enquirer.prototype.prompt = function(name) {
//   if (Array.isArray(name)) {
//     return this.ask.apply(this, arguments);
//   }

//   this.lazyInit();
//   this.queue = this.queue || [name];
//   var answers = this.answers;
//   var self = this;

//   var promise = new Promise(function (resolve, reject) {
//     var question = self.question(name).clone();
//     var PromptType = self.prompts[question.type];
//     var key = question.name;

//     if (typeof PromptType !== 'function') {
//       var msg = `prompt type "${question.type}" is not registered`;
//       return reject(new Error(msg));
//     }

//     var prompt = new PromptType(question, answers, self.ui);
//     if (self.session) prompt.session = true;
//     self.emit('prompt', question.default, question, answers, prompt);

//     return prompt.run()
//       .then(function(answer) {
//         answers[key] = question.answer = answer;
//         self.emit('answer', answer, key, question, answers);
//         return answers;
//       });
//   });


//   return promise.catch(function (err) {
//     self.close();
//     // we should throw here, because we want
//     // user to be able to catch it. By this I mean
//     // if you do `app.prompt(...)` and it
//     // fails because of something, user would want to
//     // do `app.prompt(...).catch()` to handle it, right?
//     // So, if you does not throw here, that `.catch` won't
//     // be called.
//     throw err;
//   })
// };


var fs = require('fs')
var readFilePromise = function readFilePromise (fp) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fp, function (err, res) {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

readFilePromise('not-existing')
  .then(
    function onResolved (res) {
      console.log('won`t be called 1')
    },
    function onRejected (err) {
      console.log('would be called 1')
    }
  )
  .catch(function onRejected (err) {
    console.log('won`t be called 1')
  })

// or
readFilePromise('not-existing')
  .catch(function (err) {
    console.log('would be called 2')
  })
  .catch(function (err) {
    console.log('won`t be called 2')
  })
