'use strict'

function uate(s){return(''+s).split(/\${(.*?)}/).map(function(p,i){
    return(i%2)?'('+p+')':JSON.stringify(p);}).join('+');}

var template = 'hello ${name} here'
var locals = {
  name: 'charlike'
}
var helpers = {
  upper: function upper (val) {
    return val.toUpperCase()
  },
  ucfirst: function ucfirst (val) {
    return val.charAt(0).toUpperCase() + val.slice(1)
  }
}

// console.log($`hello ${locals.name}$ here`)   // case3
// console.log($`hello $${locals.name}$$ here`) // case1
//
// // nope.
// console.log($`hello $${locals.name} here`)   // case4
// console.log($`hello $${locals.name}$ here`)  // case2

function __$tag$__ (lits) {
  var args = [].slice.call(arguments, 1)
  var result = ''
  var case1 = false
  var case3 = false
  var chLeft = false

  function esc (value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;')
  }

  args.forEach(function (value, idx) {
    var lit = lits[idx]
    var next = lits[idx + 1]
    var lastCh = lit.length - 1

    value = Array.isArray(value) ? value.join(',') : value
    lit = case1 && lit[1] === '$' ? lit.slice(2) : lit
    lit = case3 ? lit.slice(1) : lit

    // in both cases
    if (next[0] === '$') {
      value = esc(value)
      case3 = lit[lastCh - 1] !== '$'
      lit = !case3 ? lit.slice(0, -1) : lit
    }
    // case1: $${foo}$$
    if (lit[lastCh] === '$' && next[1] === '$') {
      lit = lit.slice(0, -1)
      case1 = true
    }


    // case1 = case0 && (chLeft1 && next[1] === '$')
    // case3 = !case1 && (next[0] === '$')
    // value = case1 || case3 ? esc(value) : value
    // lit = case1 ? lit.slice(0, -1) : lit

    result += lit
    result += value
  })

  var last = lits[lits.length - 1]
  // last = last[0] === '$'
  //   ? (last[1] === '$' ? last.slice(2) : last.slice(1))
  //   : last
  // last = last[0] === '$'
  //   ? last.slice(1)
  //   : last

  result += last
  return result
}

var tpl = "hello ~~$${foo}$$~~, qux ~${bar}$~ and ~~$${baz}$$~~ wahh ~~$${got}$$~~ here, mainqk!!!"
// var source = __$tag$__.toString()
//           esc    esc    $esc   esc$
var keys = ['foo', 'bar', 'baz', 'got']
var vals = ['aa<aaa', 'bb"bb', 'zz`zz', "ge'xtz"]
var fn = new Function(keys, "'use strict';return this.___$$tag$$___`" + tpl + "`")
var res = fn.apply({___$$tag$$___: __$tag$__}, vals)
console.log(res)




/**
 * newr?
 */


// function __$tag$__ (lits) {
//   var args = [].slice.call(arguments, 1)
//   var result = ''

//   args.forEach(function (value, idx) {
//     var lit = lits[idx]
//     var next = lits[idx + 1]

//     var chLeft1 = lit[lit.length - 1] === '$'
//     var chLeft2 = lit[lit.length - 2] === '$'
//     var chRight1 = lits[idx + 1][0] === '$'
//     var chRight2 = lits[idx + 1][1] === '$'
//     var case1 = (chLeft1 && chRight1 && chRight2)
//     var case3 = (!chLeft1 && chRight1)

//     if (Array.isArray(value)) {
//       value = value.join(',')
//     }

//     if (case1 || case3) {
//       value = value
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;')
//         .replace(/'/g, '&#39;')
//         .replace(/`/g, '&#96;')

//       if (case1) {
//         lit = lit.slice(0, -1)
//         lits[idx + 1] = lits[idx + 1].slice(2)
//       } else if (case3) {
//         lits[idx + 1] = lits[idx + 1].slice(1)
//       }
//     }
//     result += lit
//     result += value
//   })

//   return result
// }
