/*!
 * strip-comments <https://github.com/jonschlinkert/strip-comments>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
var extend = require('extend');

function Tint(options) {
  if (!(this instanceof Tint)) {
    return new Tint(options);
  }
  this.templates = Object.create({});
  this.cache = Object.create({});
  this.context = Object.create({});
  this.compiled = Object.create({});
  this.latest = null;
}

/**
 * Creates new named template only if not exists yet
 *
 * @param  {String} `name`
 * @param  {String} `template`
 * @return {Tint}
 */

Tint.prototype.compile = function(name, template) {
  // code
  return this;
};

/**
 * template description
 *
 * @param  {String} `name`     some desc
 * @param  {String} `template` some desc
 * @return {Tint}
 */

Tint.prototype.template = function(name, template) {
  if (!this.templates.hasOwnProperty(name)) {
    this.templates[name] = template;
    this.latest = this.templates[name];
  }
  return this;
};

/**
 * Extend Tint.context with new context
 *
 * @param  {Object} `ctx`
 * @return {Tint}
 */

Tint.prototype.addContext = function(ctx) {
  this.context = extend(true, this.context, ctx);
  return this;
};

/**
 * Returns compiled template for `name` or this.compiled as concatinated
 * string
 *
 * @param  {String} `name` name of template
 * @return {String}
 */

Tint.prototype.render = function(name) {
  if (name) {
    return this.compiled[name]
  }
  return this.compiled;
};

/**
 * Compiles given named template or all existing templates with prevously
 * predefined context. Populates Tint.compiled object.
 *
 * @param  {String} `name` (optional) name of template to compile
 * @return {Tint}
 */

Tint.prototype.compile = function(name) {
  if (name) {
    // compile logic
  }
};

/*!
 * [preview description]
 *
 * @return {[type]} [description]
 */

Tint.prototype.preview = function() {
  console.log(JSON.stringify(this.templates, null, 2))
  console.log(JSON.stringify(this.context, null, 2))
  return this;
}
var tint = new Tint();
var tinted = tint.addContext({
    name: 'Tint',
  }).addContext({
    user: {
      name: 'Charlike',
      age: 21
    }
  }).template('header', '<p>This is {{name}} Template engine!</p>').addContext({
    lipsum: 'this is lorem ipsum sit amet dolor sante'
  }).template('body', '<h1> Welcome to {{name}}</h1><div>hello {{user.name}}</div>').template('footer', '<section><p>{{user.name}} is {{user.age}} age old</p><p>{{lipsum}}</p></section>').preview()

//var compiledFooter = tint.compile('footer' /*without args to compile all templates*/)