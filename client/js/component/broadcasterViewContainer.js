'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
MentionList = require('../component/consumerMentionList');

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

    if(this.state.view === Constants.VIEW_PROGRAM_LIST){
      viewElem = React.DOM.div(null, 'New View');
    }else{
      viewElem = React.createElement(MentionList);
    }
    return viewElem;
  }
});
