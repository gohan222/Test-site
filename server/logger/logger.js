'use strict';
var log4js = require('log4js');
log4js.configure('log4js_config.json');
// log4js.loadAppender('file');
var logger = log4js.getLogger();

module.exports = logger;
