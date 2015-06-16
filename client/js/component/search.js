'use strict';

var AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
React = require('react');

var Mention = React.createClass({
  render: function() {
    console.log(AppConstant.ACTION_CREATE);
    var child = React.DOM.span(null,this.props.data.programName);
    var elm = React.DOM.div({className:'mentionList'}, child);
    return elm;
  }
});

var MentionList = React.createClass({
  render: function() {
    var mentionNodes = this.props.data.map(function (mention) {
      return React.createElement(Mention, {data:mention});
    });
    return React.DOM.div({className: 'mentionList'}, mentionNodes);
  }
});

var MentionBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.records});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return React.createElement(MentionList, {data:this.state.data});
  }
});

React.render(
  React.createElement(MentionBox, {url: "http://localhost:9090/search?confidence=12&includeSnippet=true&limit=25&offset=0&q=lakers"}),
  // React.createElement(MentionBox),
  document.getElementById('searchResult')
);
