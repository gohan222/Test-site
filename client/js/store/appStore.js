/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

 'use strict';

var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constant/appConstant');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var CHANGE_SEARCH_TERM_EVENT = 'change_keyword';
var CHANGE_RELATED_TOPICS_EVENT = 'change_realted_topics';
var CHANGE_RELATED_COLLECTIONS_EVENT = 'change_realted_collections';
var TOGGLE_HAMBURGER_EVENT = 'toggle_hamburger_event';
var CHANGE_USER_EVENT = 'change_user_event';

var searchResults = [];
var relatedTopics = [];
var relatedCollections = [];
var searchTerms = '';
var user = null;


function updateSearchResults(results){
  searchResults = results;
}

function updateRelatedTopics(results){
  relatedTopics = results;
}

function updateRelatedCollections(results){
  relatedCollections = results;
}

function updateSearchTerms(results){
  searchTerms = results;
}

var AppStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitChangeSearchTerm: function() {
    this.emit(CHANGE_SEARCH_TERM_EVENT);
  },

  emitChangeRelatedTopics: function() {
    this.emit(CHANGE_RELATED_TOPICS_EVENT);
  },

  emitChangeRelatedCollections: function() {
    this.emit(CHANGE_RELATED_COLLECTIONS_EVENT);
  },

  emitToggleHamburger: function() {
    this.emit(TOGGLE_HAMBURGER_EVENT);
  },

  emitChangeUser: function() {
    this.emit(CHANGE_USER_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  addChangeSearchTermListener: function(callback) {
    this.on(CHANGE_SEARCH_TERM_EVENT, callback);
  },

  addChangeRelatedTopicsListener: function(callback) {
    this.on(CHANGE_RELATED_TOPICS_EVENT, callback);
  },

  addChangeRelatedCollectionsListener: function(callback) {
    this.on(CHANGE_RELATED_COLLECTIONS_EVENT, callback);
  },

  addToggleHamburgerListener: function(callback) {
    this.on(TOGGLE_HAMBURGER_EVENT, callback);
  },

  addChangeUserListener: function(callback) {
    this.on(CHANGE_USER_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  removeChangeSearchTermListener: function(callback) {
    this.removeListener(CHANGE_SEARCH_TERM_EVENT, callback);
  },

  removeChangeRelatedTopicsListener: function(callback) {
    this.removeListener(CHANGE_RELATED_TOPICS_EVENT, callback);
  },  

  removeChangeRelatedCollectionsListener: function(callback) {
    this.removeListener(CHANGE_RELATED_COLLECTIONS_EVENT, callback);
  },

  removeToggleHamburgerListener: function(callback) {
    this.removeListener(TOGGLE_HAMBURGER_EVENT, callback);
  },

  removeChangeUserListener: function(callback) {
    this.removeListener(CHANGE_USER_EVENT, callback);
  },

  getSearchResults: function(){
    return searchResults.records;
  },
  
  getSearchTerms: function(){
    return searchTerms;
  },

  getSearchResultsCount: function(){
    if (searchResults){
      return searchResults.totalRecords;
    }else{
      return 0;
    }
  },

  getUser:function(){
    return user;
  },
  
  getRelatedTopics: function(){
    if(!relatedTopics){
      return [];
    }
    
    return relatedTopics.records;
  },

  getRelatedCollections: function(){
    if(!relatedCollections){
      return [];
    }
    
    return relatedCollections.records;
  },

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.ACTION_TOGGLE_HAMBURGER:
      AppStore.emitToggleHamburger();
      break;    

    case Constants.ACTION_SEARCH_INIT:
      updateSearchResults(action.searchResults);
      AppStore.emitChange();
      break;

    case Constants.ACTION_SEARCH_TERM_CHANGE:
      updateSearchTerms(action.searchTerms)
      AppStore.emitChangeSearchTerm();
      break;
    case Constants.ACTION_SEARCH_RELATED_TOPIC:
      updateRelatedTopics(action.relatedTopics);
      AppStore.emitChangeRelatedTopics();
      break;
    case Constants.ACTION_SEARCH_RELATED_COLLECTION:
      updateRelatedCollections(action.relatedCollections);
      AppStore.emitChangeRelatedCollections();
      break;
    case Constants.ACTION_CHANGE_USER:
      updateRelatedCollections(action.user);
      AppStore.emitChangeUser
      break;
    default:
      // no op
  }
});

module.exports = AppStore;