'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
ProgramList = require('../component/consumerProgramList'),
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
    var view;

    if(!AppStore.getView()){
      view = this.props.view;
    }

    return {view: view};
  },
  render: function() {
    var viewElem;

    if(this.state.view === Constants.VIEW_PROGRAM_LIST){
      viewElem = React.createElement(ProgramList);
    }else{
      viewElem = React.createElement(MentionList);
    }
    return viewElem;
  }
});
