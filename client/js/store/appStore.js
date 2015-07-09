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

var searchResults = [];
var relatedTopics = [];
var relatedCollections = [];
var searchTerms = '';
var user = null;
var currentView = '';
var programSearchResult;
var mentions = [];
var topTrends = [];
var trends = [];
var filterDays = 1;


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

function updateUser(results){
  user = results;
}

function updateView(results){
  currentView = results;
}

function updateProgramSearch(results){
  programSearchResult = results;
}

function updateMentions(results){
  mentions = results;
}

function updateTopTrends(results){
  topTrends = results;
}

function updateTrends(results){
  trends = results;
}

function updateFilter(results){
  filterDays = results;
}

var AppStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  emitChangeSearchTerm: function() {
    this.emit(Constants.CHANGE_SEARCH_TERM_EVENT);
  },

  emitChangeRelatedTopics: function() {
    this.emit(Constants.CHANGE_RELATED_TOPICS_EVENT);
  },

  emitChangeRelatedCollections: function() {
    this.emit(Constants.CHANGE_RELATED_COLLECTIONS_EVENT);
  },

  emitToggleHamburger: function() {
    this.emit(Constants.TOGGLE_HAMBURGER_EVENT);
  },

  emitChangeUser: function() {
    this.emit(Constants.CHANGE_USER_EVENT);
  },

  emitChangeView: function() {
    this.emit(Constants.CHANGE_VIEW_EVENT);
  },

  emitChangeProgramSearch: function() {
    this.emit(Constants.CHANGE_PROGRAM_SEARCH_EVENT);
  },

  emitChangeMentions: function() {
    this.emit(Constants.CHANGE_MENTIONS_EVENT);
  },

  emitChangeTopTrends: function() {
    this.emit(Constants.CHANGE_TOP_TRENDS_EVENT);
  },

  emitChangeTrends: function() {
    this.emit(Constants.CHANGE_TRENDS_EVENT);
  },

  emitChangeFilter: function() {
    this.emit(Constants.CHANGE_FILTER_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  addChangeSearchTermListener: function(callback) {
    this.on(Constants.CHANGE_SEARCH_TERM_EVENT, callback);
  },

  addChangeRelatedTopicsListener: function(callback) {
    this.on(Constants.CHANGE_RELATED_TOPICS_EVENT, callback);
  },

  addChangeRelatedCollectionsListener: function(callback) {
    this.on(Constants.CHANGE_RELATED_COLLECTIONS_EVENT, callback);
  },

  addToggleHamburgerListener: function(callback) {
    this.on(Constants.TOGGLE_HAMBURGER_EVENT, callback);
  },

  addChangeUserListener: function(callback) {
    this.on(Constants.CHANGE_USER_EVENT, callback);
  },

  addChangeViewListener: function(callback) {
    this.on(Constants.CHANGE_VIEW_EVENT, callback);
  },

  addChangeProgramSearchListener: function(callback) {
    this.on(Constants.CHANGE_PROGRAM_SEARCH_EVENT, callback);
  },

  addChangeMentionsListener: function(callback) {
    this.on(Constants.CHANGE_MENTIONS_EVENT, callback);
  },

  addChangeTopTrendsListener: function(callback) {
    this.on(Constants.CHANGE_TOP_TRENDS_EVENT, callback);
  },

  addChangeTrendsListener: function(callback) {
    this.on(Constants.CHANGE_TRENDS_EVENT, callback);
  },

  addChangeFilterListener: function(callback) {
    this.on(Constants.CHANGE_FILTER_EVENT, callback);
  },

  
  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  removeChangeSearchTermListener: function(callback) {
    this.removeListener(Constants.CHANGE_SEARCH_TERM_EVENT, callback);
  },

  removeChangeRelatedTopicsListener: function(callback) {
    this.removeListener(Constants.CHANGE_RELATED_TOPICS_EVENT, callback);
  },  

  removeChangeRelatedCollectionsListener: function(callback) {
    this.removeListener(Constants.CHANGE_RELATED_COLLECTIONS_EVENT, callback);
  },

  removeToggleHamburgerListener: function(callback) {
    this.removeListener(Constants.TOGGLE_HAMBURGER_EVENT, callback);
  },

  removeChangeUserListener: function(callback) {
    this.removeListener(Constants.CHANGE_USER_EVENT, callback);
  },

  removeChangeViewListener: function(callback) {
    this.removeListener(Constants.CHANGE_USER_EVENT, callback);
  },

  removeChangeProgramSearchListener: function(callback) {
    this.removeListener(Constants.CHANGE_PROGRAM_SEARCH_EVENT, callback);
  },

  removeChangeMentionsListener: function(callback) {
    this.removeListener(Constants.CHANGE_MENTIONS_EVENT, callback);
  },

  removeChangeTopTrendsListener: function(callback) {
    this.removeListener(Constants.CHANGE_TOP_TRENDS_EVENT, callback);
  },

  removeChangeTrendsListener: function(callback) {
    this.removeListener(Constants.CHANGE_TRENDS_EVENT, callback);
  },

  removeChangeFilterListener: function(callback) {
    this.removeListener(Constants.CHANGE_FILTER_EVENT, callback);
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

  getView:function(){
    return currentView;
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

  getProgramsSearch: function(){
    if(programSearchResult){
      return programSearchResult.records;  
    }else{
      return null;
    }
    
  },

  getMentions: function(){
    return mentions;
  },

  getTopTrends: function(){
    return topTrends;
  },

  getTrends: function(){
    return trends;
  },

  getFilter: function(){
    return filterDays;
  },

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.ACTION_TOGGLE_HAMBURGER:
      AppStore.emitToggleHamburger();
      break;    

    case Constants.ACTION_SEARCH_INIT:
      updateSearchResults(action.data);
      AppStore.emitChange();
      break;

    case Constants.ACTION_SEARCH_TERM_CHANGE:
      updateSearchTerms(action.data)
      AppStore.emitChangeSearchTerm();
      break;
    case Constants.ACTION_SEARCH_RELATED_TOPIC:
      updateRelatedTopics(action.data);
      AppStore.emitChangeRelatedTopics();
      break;
    case Constants.ACTION_SEARCH_RELATED_COLLECTION:
      updateRelatedCollections(action.data);
      AppStore.emitChangeRelatedCollections();
      break;
    case Constants.ACTION_CHANGE_USER:
      updateUser(action.data);
      AppStore.emitChangeUser();
      break;
    case Constants.ACTION_CHANGE_VIEW:
      updateView(action.data);
      AppStore.emitChangeView();
      break;
    case Constants.ACTION_PROGRAM_SEARCH:
      updateProgramSearch(action.data);
      AppStore.emitChangeProgramSearch();
      break;
    case Constants.ACTION_GET_MENTIONS:
      updateMentions(action.data);
      AppStore.emitChangeMentions();
      break;
    case Constants.ACTION_GET_TOP_TRENDS:
      updateTopTrends(action.data);
      AppStore.emitChangeTopTrends();
      break;
    case Constants.ACTION_GET_TRENDS:
      updateTrends(action.data);
      AppStore.emitChangeTrends();
      break;
    case Constants.ACTION_UPDATE_FILTER:
      updateFilter(action.data);
      AppStore.emitChangeFilter();
      break;
    default:
      // no op
  }
});

module.exports = AppStore;