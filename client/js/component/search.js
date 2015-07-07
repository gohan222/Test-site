'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
Filter = require('../component/filter'),
RelatedTopics = require('../component/relatedTopics'),
RelatedCollections = require('../component/relatedCollections'),
ConsumerViewContainer = require('../component/consumerViewContainer'),
BroadcasterViewContainer = require('../component/broadcasterViewContainer');

var CollectionHeader = React.createClass({
  render: function(){
    return React.DOM.div({className:'page-title bb'},
        React.DOM.a({className:'goright f13'}, 'View All Related Collections'),
        React.DOM.span({className:'f22 mr20', style:{paddingTop:'10px'}}, 'Collections')
        );
  }
});

module.exports = React.createClass({
  render: function() {

    var appView = this.props.app === Constants.APP_BROADCASTER ? BroadcasterViewContainer : ConsumerViewContainer
    var leftView = React.DOM.div({className:'exp-col1 ui-exp-coll min-height'}, React.createElement(Filter), React.createElement(appView));
    var rightView = React.DOM.div({className:'exp-col2'}, React.createElement(CollectionHeader), React.createElement(RelatedCollections));
    var columnView = React.DOM.div({className:''},leftView,rightView);

    return React.DOM.div({className:'contain min-height active'},
      React.createElement(RelatedTopics), 
      columnView
      );
  }
});
