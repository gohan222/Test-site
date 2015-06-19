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

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        AppConstant.ACTION_UNDO_COMPLETE :
        AppConstant.ACTION_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: AppConstant.ACTION_DESTROY_COMPLETED
    });
  },

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