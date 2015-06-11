'use strict';

var config = require('../config'),
request = require('request');

var searchService = {
  getSearchResults : function(options, callback, res) {
      request.get(config.searchUrl + '?' + options.url, function(error, response, body) {
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

};

module.exports = searchService;
