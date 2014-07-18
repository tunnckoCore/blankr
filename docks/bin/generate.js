/*!
 * docks <https://github.com/tunnckoCore/docks>
 *
 * Copyright (c) 2014 Jon Schlinkert, Charlike Mike Reagent, contributors.
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    log = console.log,
    Docks = require('./index');

function read(src) {
  var str = fs.readFileSync('./'+src,'utf-8');
  return str;
}

var fileContent = read('index.js');
var docks = new Docks(/*fileContent*/);
docks
  .content(fileContent)
  .parse();

if (process.argv[2] == 'parse') {
  log(JSON.stringify(docks.result(),null,2))
} else if (process.argv[2] == 'docs') {
  log(genApiDocs());
}

function genApiDocs() {
  var comments = JSON.parse(read('index.json'));
  var content = [], toc = [];
  comments.forEach(function(comment) {
    //log(comment.context[0].full);
    if (comment.isPrivate) {return;}
    if (comment.ignore) {return;}
    if (~comment.description.indexOf('Module dependencies')) {return;}
    if (~comment.description.indexOf('Inherit from')) {return;}

    var ctx = comment.context[0];
    if (!ctx) {return;}
    if (!ctx.string.indexOf('module.exports')) return;

    
    if (ctx.type === 'function') {
      content.push('### ' + ctx.string);
      content.push(comment.description);
      content.push('');
      content.push('**members**')
      comments.forEach(function(cmt) {
        ctx = cmt.context[0];
        if (ctx.type === 'method') {
          content.push('- ['+ctx.name+'('+ctx.args+')](#' + (ctx.cons + '-' + ctx.name).toLowerCase() + ')');
        }
      });
    } else if (ctx.type === 'method') {
      //@todo
      content.push('#### ' + ctx.cons + '# ' + ctx.name + '()');
      content.push(comment.description);
    }


    content.push('');
    if (comment.params) {
      content.push('**params**');
      comment.params.forEach(function(param) {
        var paramName = param.optional && !param.required ? '['+param.name+']' : '<'+param.name+'>'
        content.push('- `' + paramName + '` **{' + param.type + '}** ' + param.description);
      });
    }
    if (comment.return) {
      content.push('- `return` ' + comment.return.replace(/\{(.*)\}/, '**{$1}**'));
    }
    content.push('');
    content.push('```js')
    content.push(comment.source.replace(/\r?\n?\n?$/,'\n```'));
    content.push('');

  });
  
  content = content.join('\n');

  return '## API\n\n' + content;
}






















/*
function slug(str) {
  //return str.replace(/ /g,'-').replace(/[`~!@#$%\^&*()+={}[\]\\\\|;:\'",.><?\/]/g, '').toLowerCase();
  return str.toLowerCase().replace(/ /g,'XXX').replace(/\W+/g,'').replace('XXX', '-');
}
toc.push('- [' + ctx.clean + '](#' + slug(ctx.clean) + ')');

//content.push('### '+ ctx.string.replace('.prototype.','#'));
content.push(ctx.clean);
content.push('');
if (comment.params) {
  comment.params.forEach(function(param) {
    content.push('- `' + param.name + '` **{' + param.type + '}** ' + param.description);
  });
}
if (comment.return) {
  content.push('- `return` ' + comment.return.replace(/\{(.*)\}/, '**{$1}**'));
}
content.push('');
content.push('```js')
content.push(comment.source.replace(/\r?\n?\n?$/,'\n```'));
content.push('');*/
