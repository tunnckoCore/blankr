var jed = require('./index');

var html = jed("Test #{this.state || 'pass'}", {state: 'complete'})
console.log(html);
// => "Test complete"

jed("Test #{this.state || 'pass'}", {state: 'async'}, function (err, data) {
  console.log(data);
  // => "Test async"
})

var html = jed("Test #{this.state || 'pass'}");
console.log(html);
// => "Test pass"

var html = jed("Welcome back, #{this.name || 'guest'}!", {name: 'John'}, true);
console.log(html());
// => "Welcome back, guest!"
console.log(html({name: 'John'}));
// => "Welcome back, John!"

var hello = jed("Hello, #{this.name || 'world'}!", null, true);
console.log(hello());
// => "Hello, world!"

var hello = jed("Hello, #{this.name || 'world'}!", null, true);
console.log(
  hello({
    name: 'John Doe'
  })
);
// => "Hello, John Doe!"


// Or make a template with a context...
var greet = jed("Allow me to say, '#{hello(this)}'", {hello: hello}, true)

// and run it as is...
console.log(greet({name: "Jed"}))
// => "Allow me to say, 'Hello, Jed!'"


// or with its own context.
console.log( // => "Allow me to say, 'Hello, JANE DOE!'"
  greet(
    {name: "Jane Doe"},
    {hello: function(x) {
      return hello({ name: x.name.toUpperCase() })
    }}
  )
)
