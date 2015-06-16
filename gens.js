'use strict'

var isGenerator = require('is-es6-generators').isGenerator
var isGeneratorFunction = require('is-es6-generators').isGeneratorFunction
var thunkify = require('thunkify')
var alwaysThunk = require('always-thunk')
var manageArguments = require('manage-arguments')

function asyncGen (makeGenerator) {
  return function () {
    var ctx = this
    var args = manageArguments(arguments)
    var generator = null

    if (!isGenerator(makeGenerator) && !isGeneratorFunction(makeGenerator)) {
      generator = (function * () {
        // todo
        return yield alwaysThunk(makeGenerator).apply(ctx, args)
      })()
    } else {
      generator = makeGenerator.apply(ctx, args)
    }

    function handle (result) {
      if (result.done) {
        return result.value
      }

      try {
        return handle(generator.next(result.value))
      } catch (err) {
        return handle(generator.throw(err))
      }
    }

    return alwaysThunk(function () {
      return handle(generator.next())
    })

  }
}

var cnt = 10
var fs = require('co-fs')

var async = asyncGen(function * (val) {
  return yield Promise.resolve(123 + cnt + val)
})
async(22)(console.log)


// promise-to-thunk => wrap promise and return function that when execute return thunk
// always-thunk => wrap promise, sync, async (???and not function???) and when execute return thunk
// thunk2promise => wrap thunk and return promise; or wrap thunk and when execute return promise
