'use strict';

var config = require('../config'),
    logger = require('../logger/logger'),
    request = require('request');

var payload = {"PageSize":20,"Offset":0,"Parameters":[{"ParameterId":"108"},{"ParameterId":"102"},{"ParameterId":"92"},{"ParameterId":"88"},{"ParameterId":"87"},{"ParameterId":"85"},{"ParameterId":"84"},{"ParameterId":"83"},{"ParameterId":"82"},{"ParameterId":"81"},{"ParameterId":"80"},{"ParameterId":"79"},{"ParameterId":"78"},{"ParameterId":"77"},{"ParameterId":"76"},{"ParameterId":"75"},{"ParameterId":"70"},{"ParameterId":"59","ParameterValue":"9,7350"},{"ParameterId":"57"},{"ParameterId":"55"},{"ParameterId":"54"},{"ParameterId":"53"},{"ParameterId":"52"},{"ParameterId":"51"},{"ParameterId":"50"},{"ParameterId":"41"},{"ParameterId":"40"},{"ParameterId":"39"},{"ParameterId":"38"},{"ParameterId":"37"},{"ParameterId":"32"},{"ParameterId":"30"},{"ParameterId":"14"},{"ParameterId":"13"},{"ParameterId":"12"},{"ParameterId":"11"},{"ParameterId":"6"},{"ParameterId":"23","ParameterValue":"1,2,3,4"},{"ParameterId":"15","ParameterValue":"2015-02-20T08:00Z AND 2015-03-21T06:59Z"}]}

var userService = {
    getMentions: function(options, callback, res) {
        request.post({
            url: config.metricsUrl + '/analytics/mention/query',
            json: payload,
            headers: {
                'X-Veritone-Access-Token': options.user.token
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
