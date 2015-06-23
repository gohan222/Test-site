'use strict';

var React = require('react'),
Filter = require('../component/filter'),
RelatedTopics = require('../component/relatedTopics'),
MentionList = require('../component/consumerMentionList');

module.exports = React.createClass({
  render: function() {

    return React.DOM.div(null,
      React.createElement(RelatedTopics), 
      React.createElement(Filter),
      React.createElement(MentionList));
  }
});
