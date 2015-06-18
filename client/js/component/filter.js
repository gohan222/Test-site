'use strict';

var AppStore = require('../store/appStore'),
React = require('react');

module.exports = React.createClass({
  onChange: function() {
    //first we remove the data before adding new list to animate the draw.
    this.setState({recordCount: AppStore.getSearchResultsCount()});
  },
  onSearchTermChange: function(){
    this.setState({recordCount: 0});
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResultsCount()});
    AppStore.addChangeListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
  },
  getInitialState: function() {
    return {recordCount: 0};
  },
  render: function() {
    var recordCount = this.state.recordCount;
    var clipsText = React.DOM.span({className: 'f22 mr20'}, 'Clips');
    var countText = React.DOM.b(null, recordCount);
    var container = React.DOM.span(null, clipsText,countText);
    
    return container;
  }
});
