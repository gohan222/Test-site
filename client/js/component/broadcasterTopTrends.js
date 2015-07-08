'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
Constants = require('../constant/appConstant'),
React = require('react');

module.exports = React.createClass({
  
  onChange: function() {
    this.setState({recordCount: AppStore.getSearchResultsCount()});
  },
  onSearchTermChange: function(){
    this.setState({recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0});
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
  },
  getInitialState: function() {
    return {recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0};
  },
  render: function() {
    return React.DOM.div(null, 'Top Trends');
  }
});
