'use strict';

var config = require('../config'),
    request = require('request');

var searchService = {
    getTrendsMetricsRequest: function(term, startDate, endDate, callback) {
        request.get(config.searchUrl + '?confidence=12&includeSnippet=true&limit=1&maxSnippetTime=10&offset=0&endDate=' + endDate + '&startDate=' + startDate + '&q=' + term, function(error, response, body) {
            var resBody = JSON.parse(body);
            var modData = {
                searchTerm: term,
                label: startDate,
                count: resBody.totalRecords
            };
            if (callback) {
                callback.apply(this, [null, modData]);
            }
        });
    },
    getTrendsMetrics: function(options, callback, res) {
        //get the last 30days of data for each search term.

        var todayDate = new Date();
        var data = [];
        var counter = options.searchTerms.length * options.days;
        //make request per keyword
        for (var i = 0; i < options.searchTerms.length; i++) {
            var term = options.searchTerms[i];
            //request per day
            for (var j = 0; j < options.days; j++) {
                var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
                todayDate.setDate(todayDate.getDate() - j);
                var startDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
                this.getTrendsMetricsRequest(term, startDate, endDate, function(err, resBody) {
                    counter--;
                    console.log('counter: ' + counter);
                    console.log('data: ' + resBody);
                    data.push(resBody);
                    if (counter === 0) {
                        console.log('counter is zero');
                        if (callback) {
                            console.log('callback');
                            callback.apply(this, [null, data, res]);
                        }
                    }
                });

            };
        };
    },

    getTopTrends: function(options, callback, res) {
        request.get(config.analyticsUrl + '/recent_terms' + '?' + options.url, function(error, response, body) {
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

module.exports = searchService;
