'use strict';

var config = require('../config'),
request = require('request');

var COLLECTION_RELATED_TOPIC_URI

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
    getRelatedTopics : function(options, callback, res) {
      request.get(config.collectionUrl + '/collection/related/topic' + '?' + options.searchTerm, function(error, response, body) {
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

    getRelatedCollections : function(options, callback, res) {
      request.get(config.collectionUrl + '/collection/related' + '?' + options.searchTerm, function(error, response, body) {
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
