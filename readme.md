- [Option()](#option)
- [Command()](#command)
- [Command#command()](#commandcommand)
- [Command#parseExpectedArgs()](#commandparseexpectedargs)
- [Command#action()](#commandaction)
- [Command#option()](#commandoption)
- [Command#parse()](#commandparse)
- [Command#parseOptions()](#commandparseoptions)
- [Command#version()](#commandversion)
- [Command#description()](#commanddescription)
- [Command#usage()](#commandusage)
- [Command#outputHelp()](#commandoutputhelp)
- [Command#help()](#commandhelp)

### Option()

Initialize a new `Option` with the given `flags` and `description`.

#### Source:
```js
function Option(flags, description) {
  this.flags = flags;
  this.required = ~flags.indexOf('<');
  this.optional = ~flags.indexOf('[');
  this.bool = !~flags.indexOf('-no-');
  flags = flags.split(/[ ,|]+/);
  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
  this.long = flags.shift();
  this.description = description || '';
}
```

### Command()

Initialize a new `Command`.

#### Source:
```js
function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = [];
  this._args = [];
  this._name = name;
}
```

### Command#command()

Add command `name`.

The `.action()` callback is invoked when the
command `name` is specified via __ARGV__,
and the remaining arguments are applied to the
function for access.

When the `name` is "*" an un-matched command
will be passed as the first arg, followed by
the rest of __ARGV__ remaining.

#### Example:

```js
program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

program
  .command('setup')
  .description('run remote setup commands')
  .action(function(){
    console.log('setup');
  });

program
  .command('exec <cmd>')
  .description('run the given remote command')
  .action(function(cmd){
    console.log('exec "%s"', cmd);
  });

program
  .command('*')
  .description('deploy the given env')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
```

#### Source:
```js
Command.prototype.command = function(name, desc) {
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());
  if (desc) cmd.description(desc);
  if (desc) this.executables = true;
  if (desc) this._execs[cmd._name] = true;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;
  if (desc) return this;
  return cmd;
};
```

### Command#parseExpectedArgs()

Parse expected `args`.
For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.

#### Source:
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

#### Example:

```js
program
  .command('help')
  .description('display verbose help')
  .action(function(){
    // output help here
  });
```

#### Source:
```js
Command.prototype.action = function(fn){
  var self = this;
  this.parent.on(this._name, function(args, unknown){
    // Parse any so-far unknown options
    args = args || [];
    unknown = unknown || [];

    var parsed = self.parseOptions(unknown);

    // Output help if necessary
    outputHelpIfNecessary(self, parsed.unknown);

    // If there are still any unknown options, then we simply
    // die, unless someone asked for help, in which case we give it
    // to them, and then we die.
    if (parsed.unknown.length > 0) {
      self.unknownOption(parsed.unknown[0]);
    }

    // Leftover arguments need to be pushed back. Fixes issue #56
    if (parsed.args.length) args = parsed.args.concat(args);

    self._args.forEach(function(arg, i){
      if (arg.required && null == args[i]) {
        self.missingArgument(arg.name);
      }
    });

    // Always append ourselves to the end of the arguments,
    // to make sure we match the number of arguments the user
    // expects
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
      args.push(self);
    }

    fn.apply(this, args);
  });
  return this;
};
```

### Command#option()

Define option with `flags`, `description` and optional
coercion `fn`.

The `flags` string should contain both the short and long flags,
separated by comma, a pipe or space. The following are all valid
all will output this way when `--help` is used.

   "-p, --pepper"
   "-p|--pepper"
   "-p --pepper"

#### Example:

```js
/ simple boolean defaulting to false
program.option('-p, --pepper', 'add pepper');

--pepper
program.pepper
/ => Boolean

/ simple boolean defaulting to true
program.option('-C, --no-cheese', 'remove cheese');

program.cheese
/ => true

--no-cheese
program.cheese
/ => false

/ required argument
program.option('-C, --chdir <path>', 'change the working directory');

--chdir /tmp
program.chdir
/ => "/tmp"

/ optional argument
program.option('-c, --cheese [type]', 'add cheese [marble]');
```

#### Source:
```js
Command.prototype.option = function(flags, description, fn, defaultValue){
  var self = this
    , option = new Option(flags, description)
    , oname = option.name()
    , name = camelcase(oname);

  // default as 3rd arg
  if ('function' != typeof fn) defaultValue = fn, fn = null;

  // preassign default value only for --no-*, [optional], or <required>
  if (false == option.bool || option.optional || option.required) {
    // when --no-* we make sure default is true
    if (false == option.bool) defaultValue = true;
    // preassign only if we have a default
    if (undefined !== defaultValue) self[name] = defaultValue;
  }

  // register the option
  this.options.push(option);

  // when it's passed assign the value
  // and conditionally invoke the callback
  this.on(oname, function(val){
    // coercion
    if (null !== val && fn) val = fn(val, undefined === self[name] ? defaultValue : self[name]);

    // unassigned or bool
    if ('boolean' == typeof self[name] || 'undefined' == typeof self[name]) {
      // if no value, bool true, and we have a default, then use it!
      if (null == val) {
        self[name] = option.bool
          ? defaultValue || true
          : false;
      } else {
        self[name] = val;
      }
    } else if (null !== val) {
      // reassign
      self[name] = val;
    }
  });

  return this;
};
```

### Command#parse()

Parse `argv`, settings options and invoking commands when defined.

#### Source:
```js
Command.prototype.parse = function(argv){
  // implicit help
  if (this.executables) this.addImplicitHelpCommand();

  // store raw args
  this.rawArgs = argv;

  // guess name
  this._name = this._name || basename(argv[1], '.js');

  // process argv
  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
  var args = this.args = parsed.args;

  var result = this.parseArgs(this.args, parsed.unknown);

  // executable sub-commands
  var name = result.args[0];
  if (this._execs[name]) return this.executeSubCommand(argv, args, parsed.unknown);

  return result;
};
```

### Command#parseOptions()

Parse options from `argv` returning `argv`
void of these options.

#### Source:
```js
Command.prototype.parseOptions = function(argv){
  var args = []
    , len = argv.length
    , literal
    , option
    , arg;

  var unknownOptions = [];

  // parse options
  for (var i = 0; i < len; ++i) {
    arg = argv[i];

    // literal args after --
    if ('--' == arg) {
      literal = true;
      continue;
    }

    if (literal) {
      args.push(arg);
      continue;
    }

    // find matching Option
    option = this.optionFor(arg);

    // option is defined
    if (option) {
      // requires arg
      if (option.required) {
        arg = argv[++i];
        if (null == arg) return this.optionMissingArgument(option);
        this.emit(option.name(), arg);
      // optional arg
      } else if (option.optional) {
        arg = argv[i+1];
        if (null == arg || ('-' == arg[0] && '-' != arg)) {
          arg = null;
        } else {
          ++i;
        }
        this.emit(option.name(), arg);
      // bool
      } else {
        this.emit(option.name());
      }
      continue;
    }

    // looks like an option
    if (arg.length > 1 && '-' == arg[0]) {
      unknownOptions.push(arg);

      // If the next argument looks like it might be
      // an argument for this option, we pass it on.
      // If it isn't, then it'll simply be ignored
      if (argv[i+1] && '-' != argv[i+1][0]) {
        unknownOptions.push(argv[++i]);
      }
      continue;
    }

    // arg
    args.push(arg);
  }

  return { args: args, unknown: unknownOptions };
};
```

### Command#version()

Set the program version to `str`.

This method auto-registers the "-V, --version" flag
which will print the version number when passed.

#### Source:
```js
Command.prototype.version = function(str, flags){
  if (0 == arguments.length) return this._version;
  this._version = str;
  flags = flags || '-V, --version';
  this.option(flags, 'output the version number');
  this.on('version', function(){
    console.log(str);
    process.exit(0);
  });
  return this;
};
```

### Command#description()

Set the description `str`.

#### Source:
```js
Command.prototype.description = function(str){
  if (0 == arguments.length) return this._description;
  this._description = str;
  return this;
};
```

### Command#usage()

Set / get the command usage `str`.

#### Source:
```js
Command.prototype.usage = function(str){
  var args = this._args.map(function(arg){
    return arg.required
      ? '<' + arg.name + '>'
      : '[' + arg.name + ']';
  });

  var usage = '[options'
    + (this.commands.length ? '] [command' : '')
    + ']'
    + (this._args.length ? ' ' + args : '');

  if (0 == arguments.length) return this._usage || usage;
  this._usage = str;

  return this;
};
```

### Command#outputHelp()

Output help information for this command

#### Source:
```js
Command.prototype.outputHelp = function(){
  process.stdout.write(this.helpInformation());
  this.emit('--help');
};
```

### Command#help()

Output help information and exit.

#### Source:
```js
Command.prototype.help = function(){
  this.outputHelp();
  process.exit();
};
```

