'use strict';

var config = require('../config'),
    logger = require('../logger/logger'),
    request = require('request');

var userService = {
    login: function(options, callback, res) {
        request.post({
            url: config.ssoAuthUrl + '/login',
            json: {
                userName: options.username,
                password: options.password
            }
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                if (callback) {
                    callback.apply(this, [null, body, res]);
                }
            } else {
                if (callback) {
                    callback.apply(this, [error, null, res]);
                }
            }
        });
    }
};

module.exports = userService;
