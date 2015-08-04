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
    resetViewData: function(){
      //reset filters on view change.
        AppAction.filterTopMention(null);
        if (this.state.view === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST) {
          AppAction.updateFilter(7);
        }else{
          AppAction.updateFilter(1);
        }
    },
    onChange: function() {
        this.setState({
            view: AppStore.getView()
        });
        
        this.resetViewData();

        if (AppStore.getView() === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST) {
            var trend = this.parseSearchTerms(AppStore.getSearchTerms());
            AppAction.updateTopTrends(trend);
        }
    },
    onSearchTermChange: function() {
        //prepopulate the top trends search for the mentions control
        if (this.state.view === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST) {
            var trend = this.parseSearchTerms(AppStore.getSearchTerms());
            AppAction.updateTopTrends(trend);
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
