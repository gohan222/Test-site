'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
Filter = require('../component/filter'),
BroadcasterViewContainer = require('../component/broadcasterViewContainer');

var buttonGroup = [{view: Constants.VIEW_TOP_TRENDS_LIST ,icon: 'glyphicon glyphicon-stats'},
                  {view: Constants.VIEW_TRENDING_SEARCH_TERMS_LIST ,icon: 'glyphicon glyphicon-signal'}];

module.exports = React.createClass({
  render: function() {

    var leftView = React.DOM.div({className:'ui-exp-coll min-height'}, React.createElement(Filter,{app: this.props.app , buttonGroup: buttonGroup}), React.createElement(BroadcasterViewContainer));
    var columnView = React.DOM.div({className:''},leftView);

    return React.DOM.div({className:'contain min-height active'},
      columnView
      );
  }
});
