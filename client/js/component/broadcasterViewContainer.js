'use strict';

var React = require('react'),
    Constants = require('../constant/appConstant'),
    Immutable = require('immutable'),
    AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    BroadcasterTopTrends = require('../component/broadcasterTopTrends'),
    BroadcasterTopTrendsMention = require('../component/broadcasterTopTrendsMention'),
    BroadcasterTrendSearchTerm = require('../component/broadcasterTrendSearchTerm');

module.exports = React.createClass({
    parseSearchTerms: function(searchTerms) {
        var list = [];
        var token = searchTerms.split(',');
        for (var i = 0; i < token.length; i++) {
            list.push({
                term: token[i],
                count: 0
            });
        };

        return list;
    },
    onChange: function() {
        this.setState({
            view: AppStore.getView()
        });
    },
    onSearchTermChange: function() {
        //prepopulate the top trends search for the mentions control
        if (this.state.view === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST) {
            var trend = this.parseSearchTerms(AppStore.getSearchTerms());
            setTimeout(function() {
                AppAction.updateTopTrends(trend);
            }, 1);
        }

    },
    componentDidMount: function() {
        AppStore.addChangeViewListener(this.onChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeViewListener(this.onChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    getInitialState: function() {
        return {
            view: this.props.view
        };
    },
    render: function() {
        var viewElem;

        if (this.state.view === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST) {
            viewElem = React.DOM.div(null, React.createElement(BroadcasterTrendSearchTerm), React.createElement(BroadcasterTopTrendsMention, {
                key: 'searchTerms'
            }));
        } else {
            viewElem = React.DOM.div(null, React.createElement(BroadcasterTopTrends), React.createElement(BroadcasterTopTrendsMention, {
                key: 'topTrends'
            }));
        }
        return viewElem;
    }
});
