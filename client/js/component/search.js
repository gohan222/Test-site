'use strict';

var React = require('react'),
Filter = require('../component/filter'),
RelatedTopics = require('../component/relatedTopics'),
RelatedCollections = require('../component/relatedCollections'),
MentionList = require('../component/consumerMentionList');

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
    var leftView = React.DOM.div({className:'exp-col1 ui-exp-coll min-height'}, React.createElement(Filter), React.createElement(MentionList));
    var rightView = React.DOM.div({className:'exp-col2'}, React.createElement(CollectionHeader), React.createElement(RelatedCollections));
    var columnView = React.DOM.div({className:''},leftView,rightView);

    return React.DOM.div({className:'contain min-height active'},
      React.createElement(RelatedTopics), 
      columnView
      );
  }
});
