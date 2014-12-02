var isNode = typeof process !== 'undefined' && process.versions && !!process.versions.node;
var isBrowser = typeof window !== 'undefined';

if (isNode && !isBrowser) {
  module.exports = jedExport;
} else {
  this.jed = jedExport;
}

function jedExport(str, options, done) {
  if (typeof done == 'boolean' && done == true) return jedFn(str, options);

  var raw, output;
  try {
    raw = jedFn(str);
    output = raw(options);
    if (typeof done == 'function') return done(null, output);
    else return output;
  } catch (err) {
    if (typeof done == 'function') return done(err, null);
    else return err;
  }
}

function jedFn(
  a, // the string source from which the template is compiled
  b  // the default `with` context of the template (optional)
){
  return function(
    c, // the object called as `this` in the template
    d  // the `with` context of this template call (optional)
  ){
    return a.replace(
      /#{([^}]*)}/g, // a regexp that finds the interpolated code: "#{<code>}"
      function(
        a, // not used, only positional
        e  // the code matched by the interpolation
      ){
        return Function(
          "x",
          "with(x)return " + e // the result of the interpolated code
        ).call(
          c,    // pass the data object as `this`, with
          d     // the most
          || b  // specific
          || {} // context.
        )
      }
    )
  }
}
