'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
BroadcasterTopTrends = require('../component/broadcasterTopTrends'),
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

    if(this.state.view === Constants.VIEW_TOP_TRENDS_LIST){
      viewElem = React.createElement(BroadcasterTopTrends);
    }else{
      viewElem = React.createElement(BroadcasterTrendSearchTerm);
    }
    return viewElem;
  }
});
