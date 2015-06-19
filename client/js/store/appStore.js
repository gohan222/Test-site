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
var TodoConstants = require('../constant/appConstant');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var CHANGE_SEARCH_TERM_EVENT = 'change_keyword';
var CHANGE_RELATED_TOPICS_EVENT = 'change_realted_topics';
var CHANGE_RELATED_COLLECTIONS_EVENT = 'change_realted_collections';

var _todos = {};
var searchResults = [];
var relatedTopics = [];
var relatedCollections = [];
var searchTerms = '';

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

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

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

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
  var text;

  switch(action.actionType) {
    case TodoConstants.ACTION_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.ACTION_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.ACTION_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.ACTION_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.ACTION_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.ACTION_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.ACTION_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    case TodoConstants.ACTION_SEARCH_INIT:
      updateSearchResults(action.searchResults);
      TodoStore.emitChange();
      break;

    case TodoConstants.ACTION_SEARCH_TERM_CHANGE:
      updateSearchTerms(action.searchTerms)
      TodoStore.emitChangeSearchTerm();
      break;
    case TodoConstants.ACTION_SEARCH_RELATED_TOPIC:
      updateRelatedTopics(action.relatedTopics);
      TodoStore.emitChangeRelatedTopics();
      break;
    case TodoConstants.ACTION_SEARCH_RELATED_COLLECTION:
      updateRelatedCollections(action.relatedCollections);
      TodoStore.emitChangeRelatedCollections();
      break;
    default:
      // no op
  }
});

module.exports = TodoStore;