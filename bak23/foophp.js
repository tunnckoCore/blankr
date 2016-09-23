'use strict'

var Parser = require('snapdragon/lib/parser')
var parser = new Parser()
  .capture('colon', /^:\s?/)
  .pair('object', /^\{/, /^\}/)
  .pair('array', /^\[/, /^\]/)
  .use(function () {
    var pos = this.position()
    var m = this.match(/^"/)
    if (!m) return
    this.pair = this.pair || 0
    console.log(this.prev())

    if (this.quoteOpen) {
      this.quoteOpen = false
      this.pair++
      return pos({
        type: 'quote.close',
        val: '"'
      })
    }
    this.quoteOpen = true
    return pos({
      type: 'quote.open',
      val: '"'
    })
  })
  .use(function () {
    var pos = this.position()
    var m = this.match(/^\\(.)/)
    if (!m) return
    return pos({
      type: 'escaped',
      val: m[1]
    })
  })
  .use(function () {
    var pos = this.position()
    var m = this.match(/^,\s?/)
    if (!m) return
    return pos({
      type: 'comma',
      val: m[0]
    })
  })
  .use(function () {
    var pos = this.position()
    var m = this.match(/^[\w\s-.]+/)
    if (!m) return
    var trimmed = m[0].trim()
    if (!trimmed.length) {
      return pos({
        type: 'whitespace',
        val: m[0]
      })
    }
    if (!(this.pair % 2)) {
      this.pair = 0
      return pos({
        type: 'key',
        val: m[0]
      })
    }
    return pos({
      type: 'value',
      val: m[0]
    })
  })

// var ast = parser.parse('{"foo": "bar", "qxu": 123}')
var ast = parser.parse(`{
  "foo": "bar",
  "vaz": "qux",
  "num": 123,
  "negative": -12,
  "bool": true,
  "some": ["arr", "here", 123, "and", null]
  "nulled": null,
  "floating": .45,
  "obj": {
    "data": 33,
    "nested": {
      "abc": "def"
    },
    "aaa": "bbb",
    "arr": [1, "str", 222]
  }
}`)

ast.nodes[1].nodes.forEach(function visit (node) {
  delete node.parsed
  delete node.rest
  delete node.inner
  delete node.suffix

  if (node.type === 'object' || node.type === 'array') {
    node.nodes.forEach(visit)
  } else {
    console.log(node)
  }
})
