'use strict';

var config = require('../config'),
    request = require('request');

var COLLECTION_RELATED_TOPIC_URI

var searchService = {
    getSearchResults: function(options, callback, res) {
        request.get(config.searchUrl + '?' + options.url, function(error, response, body) {
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
    },
    getSearchByPrograms: function(options, callback, res) {

        var programIds = options.programIds.split(',');
        var counter = programIds.length;
        var mergedResponse ={
          records:[]
        };
        for (var i = 0; i < programIds.length; i++) {
            var programId = programIds[i];
            request.get(config.searchUrl + '?confidence=12&includeSnippet=true&limit=25&offset=0&q='+ options.searchTerms + '&programIds=' + programId, function(error, response, body) {
                counter--;
                if (!error && response.statusCode === 200) {
                    var resBody = JSON.parse(body);
                    // mergedResponse.records = mergedResponse.records.concat(resBody.records); 
                    if(resBody.records && resBody.records.length > 0){
                      mergedResponse.records.push({programId: resBody.records[0].programId, records: resBody.records});
                    }

                    if (counter === 0 && callback) {
                        console.log('callback');
                        callback.apply(this, [null, mergedResponse, res]);
                    }
                } else {
                    if (counter === 0 && callback) {
                        console.log('callback');
                        callback.apply(this, [error, null, res]);
                    }
                }
            });
        };
    },
    getRelatedTopics: function(options, callback, res) {
        request.get(config.collectionUrl + '/collection/related/topic' + '?' + options.searchTerm, function(error, response, body) {
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
    },

    getRelatedCollections: function(options, callback, res) {
        request.get(config.collectionUrl + '/collection/related' + '?' + options.searchTerm, function(error, response, body) {
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
    },

    getTrendsMetrics: function(options, callback, res) {
        //get the last 30days of data for each search term.

        var todayDate = new Date();
        var data = [];
        //build array for last 30 days
        for (var i = 0; i < 30; i++) {
            data.push
        };

        request.get(config.searchUrl + '?confidence=12&endDate=2015-03-16&includeSnippet=true&limit=1&maxSnippetTime=10&offset=0&startDate=2015-03-15&q=' + options.searchTerms[0], function(error, response, body) {
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
