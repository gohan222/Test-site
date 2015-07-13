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
var AppServiceUser = require('../service/user');
var AppServiceAnalytics = require('../service/analytics');



var appAction = {
    submitLogin: function(username, password) {
        AppServiceUser.login(username, password, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_CHANGE_USER,
                data: data
            });
        });
    },

    toggleHamburger: function() {
        AppDispatcher.dispatch({
            actionType: AppConstant.ACTION_TOGGLE_HAMBURGER
        });
    },

    searchInit: function(searchTerms) {
        AppService.getSearch(searchTerms, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_SEARCH_INIT,
                data: data
            });
        }, true, this.sendProgress);
    },

    changeSearchTerm: function(searchTerms) {
        AppDispatcher.dispatch({
            actionType: AppConstant.ACTION_SEARCH_TERM_CHANGE,
            data: searchTerms
        });
    },

    getRelatedTopics: function(searchTerms) {
        AppService.getRelatedTopics(searchTerms, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_SEARCH_RELATED_TOPIC,
                data: data
            });
        });
    },

    getRelatedCollections: function(searchTerms) {
        AppService.getRelatedCollections(searchTerms, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_SEARCH_RELATED_COLLECTION,
                data: data
            });
        });
    },
    changeView: function(view) {
        AppDispatcher.dispatch({
            actionType: AppConstant.ACTION_CHANGE_VIEW,
            data: view
        })
    },
    getSearchByProgramId: function(programIds, searchTerms) {
        AppService.getSearchByProgramId(programIds, searchTerms, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_PROGRAM_SEARCH,
                data: data
            });
        });
    },

    getMentions: function() {
        AppService.getMentions(function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_GET_MENTIONS,
                data: data
            });
        });
    },

    getTopTrends: function(days) {
        AppServiceAnalytics.getTopTrends(days, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_GET_TOP_TRENDS,
                data: data
            });
        });
    },
    getTrends: function(searchTerms, days) {
        AppServiceAnalytics.getTrends(searchTerms, days, function(data) {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_GET_TRENDS,
                data: data
            });
        });
    },
    updateFilter: function(days) {
        AppDispatcher.dispatch({
            actionType: AppConstant.ACTION_UPDATE_FILTER,
            data: days
        });
    },

    sendProgress: function(percentComplete) {
        setTimeout(function() {
            AppDispatcher.dispatch({
                actionType: AppConstant.ACTION_UPDATE_PROGRESS,
                data: percentComplete
            });
        }, 1);

    }
};

module.exports = appAction;
