# Blankr


### Command()

Initialize a new `Command`.

```js
function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = [];
  this._args = [];
  this._name = name;
}
```

### Command#parseExpectedArgs()

Parse expected `args`.

For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.

```js
Command.prototype.parseExpectedArgs = function(args){
  if (!args.length) return;
  var self = this;
  args.forEach(function(arg){
    switch (arg[0]) {
      case '<':
        self._args.push({ required: true, name: arg.slice(1, -1) });
        break;
      case '[':
        self._args.push({ required: false, name: arg.slice(1, -1) });
        break;
    }
  });
  return this;
};
```

### Command#action()

Register callback `fn` for the command.
