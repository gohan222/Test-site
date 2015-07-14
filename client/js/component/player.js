var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: '',
      poster:'',
      fileType:''
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return React.DOM.div(null,'video player');
  }
});