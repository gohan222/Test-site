/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * appAction
 */

 'use strict';

var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstant = require('../constant/appConstant');
var AppService = require('../service/search');

var appAction = {

  searchInit:function(searchTerms){
    AppService.getSearch(searchTerms,function(data){
      AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_SEARCH_INIT,
      searchResults:data
    });
    });
  },

  changeSearchTerm:function(searchTerms){
    AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_SEARCH_TERM_CHANGE,
      searchTerms:searchTerms
    });
  },

  getRelatedTopics:function(searchTerms){
    AppService.getRelatedTopics(searchTerms,function(data){
      AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_SEARCH_RELATED_TOPIC,
      relatedTopics:data
    });
    });
  },

  getRelatedCollections:function(searchTerms){
    AppService.getRelatedCollections(searchTerms,function(data){
      AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_SEARCH_RELATED_COLLECTION,
      relatedCollections:data
    });
    });
  }

};

module.exports = appAction;