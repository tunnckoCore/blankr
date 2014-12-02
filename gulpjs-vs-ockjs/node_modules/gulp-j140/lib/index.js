/**
 * gulp-j140 - lib/index.js
 * Copyright (c) 2014
 * MIT Licensed
 *
 * @author  Charlike Mike Reagent (@tunnckoCore)
 * @api private
 */
'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var jed = require('j140');

module.exports = function(data) {
	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}
		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-j140', 'Streaming not supported'));
			return cb();
		}
		try {
			file.contents = new Buffer(jed(file.contents.toString(), data));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-j140', err));
		}
		this.push(file);
		cb();
	});
};