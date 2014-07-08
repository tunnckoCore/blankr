#!/usr/bin/env node

var fs = require('fs');
var prodown = require('./prodown').prodown;

console.log('Start writing...');
var plain = fs.readFileSync(__dirname + '/prodownbaw.md', 'utf8');
//console.log('plain md read...');

console.log("waiting ... "+prodown.toHTML(plain));
//fs.writeFileSync('prodown.html', prodown.toHTML(plain), 'utf8');