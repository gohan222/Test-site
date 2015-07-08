'use strict';

var config = require('../config'),
request = require('request');

var searchService = {
    getTrendsMetrics : function(options, callback, res) {
      //get the last 30days of data for each search term.

      var todayDate = new Date();
      var data = [];
      //build array for last 30 days
      for (var i = 0; i < 30; i++) {
        data.push
      };

      request.get(config.searchUrl + '?confidence=12&endDate=2015-03-16&includeSnippet=true&limit=1&maxSnippetTime=10&offset=0&startDate=2015-03-15&q=' + options.searchTerms[0], function(error, response, body) {
        if (!error && response.statusCode === 200) {
          if(callback){
            callback.apply(this,[null,body,res]);
          }
        }else{
          if(callback){
            callback.apply(this,[error,null,res]);
          }
        }
      });
    },

    getTopTrends : function(options, callback, res) {
      request.get(config.analyticsUrl + '/recent_terms' + '?' + options.url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          if(callback){
            callback.apply(this,[null,body,res]);
          }
        }else{
          if(callback){
            callback.apply(this,[error,null,res]);
          }
        }
      });
    }
};

module.exports = searchService;
