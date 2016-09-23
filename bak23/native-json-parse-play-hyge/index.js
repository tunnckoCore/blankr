/*!
 * hyge <https://github.com/tunnckoCore/hyge>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'


// 0x23/* # */
// 0x26/* & */
// 0x2A/* * */
// 0x21/* ! */
// 0x7C/* | */
// 0x3E/* > */
// 0x27/* ' */
// 0x22/* " */
// 0x25/* % */
// 0x40/* @ */

var limon = require('limon')
var prevNextPlugin = require('limon-prev-next')

limon
  .use(function utils (app) {
    return function (ch, idx, input) {
      app.lookahead = function lookahead (num) {
        return input.slice(idx, idx + num)
      }
      app.checkahead = function checkahead (str) {
        return str === app.lookahead(str.length)
      }
      app.lookbehind = function lookbehind (num) {
        if (num > idx) return input.slice(0, idx)
        return input.slice(idx - num, idx)
      }
      app.checkbehind = function checkbehind (str) {
        return str === app.lookbehind(str.length)
      }
    }
  })
  .use(prevNextPlugin())
  .use(function charUtilsPlugin (app) {
    function factory (name, condition) {
      return function (ch) {
        if (typeof ch === 'string') {
          ch = ch.charCodeAt(0)
        }
        return condition(ch)
      }
    }

    return function (char, index, input) {

      app.toHex = function toHex (c) {
        c = String(c || char)
        return Number('0x' + c.charCodeAt(0).toString(16))
      }
      app.isWhitespace = factory('isWhitespace', function (c) {
        c = app.toHex(c || char)
        return (c === 0x09/* Tab */) || (c === 0x20/* Space */)
      })
      app.isWhitespaceOrEOL = factory('isWhitespaceOrEOL', function (c) {
        c = app.toHex(c || char)
        return (c === 0x09/* Tab */) ||
           (c === 0x20/* Space */) ||
           (c === 0x0A/* LF */) ||
           (c === 0x0D/* CR */)
      })
      app.isEOL = factory('isEOL', function (c) {
        c = app.toHex(c || char)
        return (c === 0x0A/* LF */) || (c === 0x0D/* CR */)
      })
      app.isQuote = factory('isQuote', function (c) {
        c = app.toHex(c || char)
        return (c === 0x27/* ' */) || (c === 0x22/* " */)
      })
      app.isColon = factory('isColon', function (c) {
        c = app.toHex(c || char)
        return c === 0x3A/* : */
      })
      app.isFlowIndicator = factory('isFlowIndicator', function (c) {
        c = app.toHex(c || char)
        return 0x2C/* , */ === c ||
           0x5B/* [ */ === c ||
           0x5D/* ] */ === c ||
           0x7B/* { */ === c ||
           0x7D/* } */ === c
      })
    }
  })
  .use(function linesAndOffsets (app) {
    return function (char, index, input) {
      this.temp = this.temp || ''
      this.quotes = this.quotes || 0
      this.char = this.char || char

      if (this.isQuote(this.char)) this.quotes++
      while (!this.char.match(/:/)) {
        this.temp += this.char
        this.char = this.next()
      }

      console.log(this.temp)
    }
  })
  .tokenize('foo bar: bar qux')

// console.log(limon.tokens)
