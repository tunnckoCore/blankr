var async = require('async');
var Metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var render = require('consolidate').handlebars.render;
var prompt = require('cli-prompt');
var dateformat = require('dateformat');
var handlebars = require('handlebars');
var path = require('path');

var BitlyAPI = require("node-bitlyapi");
var Bitly = new BitlyAPI({
    client_id: "Something",
    client_secret: "Something"  
});

handlebars.registerHelper('date', function(fmt) {
  return dateformat(new Date, fmt);
});
handlebars.registerHelper('toLower', function(str) {
  return str.toLowerCase();
})


/**
 * Build.
 */

var metalsmith = Metalsmith(__dirname)
  .use(ask)
  .use(renderer)
  .build(function(err){
    if (err) throw err;
  });

/**
 * Prompt plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
function ask(files, metalsmith, done){
   var prompts = [
    'name (ock)', 'repository (tosckjs/ock)', 'description', 'license (MIT)',
    'author (name)', 'author (email)', 'author (website)',
    'author (gittip)', 'author (github)',
    'author (twitter)', 'author (npmjs)'
  ];
  var metadata = metalsmith.metadata();

  async.eachSeries(prompts, run, function () {
    metalsmith.destination(metadata.name)
    done();
  });

  metadata.author = {};
  metadata.license = {};

  function run(key, done){

    prompt('[?]  ' + key + ': ', function(val){
      var regexp = /(author)? \((.*)\)/gi;
      var authorProp = key.replace(regexp, '$2');
      key = key.replace(regexp, '');

      if (key === 'license') {
        metadata.license.type = val;
      } else if (key === '') {
        metadata.author[authorProp] = val
      } else {
        metadata[key] = val;
      }

      done();
    });
  }
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function renderer(files, metalsmith, done){
  var keys = Object.keys(files);
  var metadata = metalsmith.metadata();

  async.each(keys, run, done);

  function run(file, done){
    var str = files[file].contents.toString();
    render(str, metadata, function(err, res){
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}