'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
Constants = require('../constant/appConstant'),
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
  changeListView: function(){
    AppAction.changeView(Constants.VIEW_MENTION_LIST);
  },
  changeProgramView: function(){
    AppAction.changeView(Constants.VIEW_PROGRAM_LIST);
  },
  render: function() {
    var recordCount = this.state.recordCount;
    var clipsText = React.DOM.span({className: 'f22 mr20'}, 'Clips');
    var countText = React.DOM.b(null, recordCount);
    var buttonBar = React.DOM.div({className: 'btn-group', role:'group'},
      React.DOM.button({className:'btn btn-default', type:'button', onClick:this.changeListView}, React.DOM.span({className:'glyphicon glyphicon-list'})),
      React.DOM.button({className:'btn btn-default', type:'button', onClick:this.changeProgramView}, React.DOM.span({className:'glyphicon glyphicon-indent-left'})));
    var advFilter = React.DOM.div({className:'adv-holder'},
      buttonBar);
    var container = React.DOM.span(null, clipsText,countText, advFilter);
    
    return React.DOM.div({className:'page-title bb'}, container);
  }
});
