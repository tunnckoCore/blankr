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
  //.comments()
  //.sources()
  .parse();
  //.result()

if (process.argv[2] == 'parse') {
  log(JSON.stringify(docks.result(),null,2))
} else if (process.argv[2] == 'docs') {
  log(genApiDocs());
}

function genApiDocs() {
  var comments = read('readme.json');
  var content = [], toc = [];
  JSON.parse(comments).forEach(function(comment) {
    if (comment.isPrivate) return;
    if (comment.ignore) return;
    var ctx = comment.context;
    var title = ctx.string.replace('.prototype.','#');
    if (!ctx) return;

    toc.push('- [' + title + '](#' + slug(title) + ')');

    //content.push('### '+ ctx.string.replace('.prototype.','#'));
    content.push(comment.description);
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
    content.push('**Source:**');
    content.push('```js')
    content.push(comment.source.replace(/\n?\n?$/,'\n```'));
    content.push('');
  });
  
  toc = toc.join('\n')
  content = content.join('\n');

  return '## API\n### Table of contents\n' + toc + '\n\n' + content;
}

function slug(str) {
  return str.replace(/\W+/g, '').toLowerCase();
}