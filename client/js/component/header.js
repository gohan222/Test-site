'use strict';

var AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
React = require('react');

module.exports = React.createClass({
  /*loadCommentsFromServer: function() {
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
  },*/
  keyEvent: function(event) {
    console.log(event);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    var child = React.DOM.a({className:'search-btn s-animate'});
    return React.DOM.input({id: 'ui-search-text',name: 'mentionList', type:'text', className:'blank', placeholder:'Explore...', onKeyPress: this.keyEvent}, child);
  }
});
