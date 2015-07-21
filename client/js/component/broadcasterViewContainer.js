'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
BroadcasterTopTrends = require('../component/broadcasterTopTrends'),
BroadcasterTopTrendsMention = require('../component/broadcasterTopTrendsMention'),
BroadcasterTrendSearchTerm = require('../component/broadcasterTrendSearchTerm');

module.exports = React.createClass({
  onChange:function(){
    this.setState({view: AppStore.getView()});
  },
  componentDidMount: function() {
    AppStore.addChangeViewListener(this.onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeViewListener(this.onChange);
  },
  getInitialState: function() {
    return {view: this.props.view};
  },
  render: function() {
    var viewElem;

    if(this.state.view === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST){
      viewElem = React.createElement(BroadcasterTrendSearchTerm);
    }else{
      viewElem = React.DOM.div(null, React.createElement(BroadcasterTopTrends), React.createElement(BroadcasterTopTrendsMention));
    }
    return viewElem;
  }
});
