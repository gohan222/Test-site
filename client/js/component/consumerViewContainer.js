'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
ReactRouter = require('react-router');

module.exports = React.createClass({
  onChange:function(){
    /*this.setState({view: AppStore.getView()});*/
  },
  componentDidMount: function() {
    AppStore.addChangeViewListener(this.onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeViewListener(this.onChange);
  },
  render: function() {
    var viewElem = React.createElement(ReactRouter.RouteHandler);
    return viewElem;
  }
});
