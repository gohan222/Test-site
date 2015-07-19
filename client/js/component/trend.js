'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
Filter = require('../component/filter'),
BroadcasterViewContainer = require('../component/broadcasterViewContainer');

var buttonGroup = [{view: Constants.VIEW_TOP_TRENDS_LIST ,icon: 'glyphicon glyphicon-stats'},
                  {view: Constants.VIEW_TRENDING_SEARCH_TERMS_LIST ,icon: 'glyphicon glyphicon-signal'}];

module.exports = React.createClass({
  render: function() {

    var view = React.DOM.div({className:'ui-exp-coll'}, React.createElement(Filter,{app: this.props.app , buttonGroup: buttonGroup}), React.createElement(BroadcasterViewContainer));
    
    return React.DOM.div({className:'contain active'},
      view
      );
  }
});
