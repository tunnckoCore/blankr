#!/usr/bin/env node

var npm = require('npm');
var opn = require('opn');

npm.load({}, function(er) {
    if (er) {
        console.error(err);
        process.exit(1);
    }
    npm.commands.view([process.argv[2], "repository.url"], function(err, rurl) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var url = require('url');
        var obj = url.parse(rurl[Object.keys(rurl)[0]]['repository.url']);
        if (obj.protocol !== 'https:') obj.protocol = 'https:'
        opn(url.format(obj));
    });
});
