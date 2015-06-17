'use strict';

var AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
AppStore = require('../store/appStore'),
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

module.exports = React.createClass({
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
  onChange: function() {
    this.setState({data: AppStore.getSearchResults()});
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResults()});
    AppStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return React.createElement(MentionList, {data:this.state.data});
  }
});
