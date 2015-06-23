'use strict';

var AppStore = require('../store/appStore'),
React = require('react');

module.exports = React.createClass({
  onChange: function() {
    this.setState({show: !this.state.show});
  },
  componentDidMount: function() {
    AppStore.addToggleHamburgerListener(this.onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeToggleHamburgerListener(this.onChange);
  },
  getInitialState: function() {
    return {show: false};
  },
  render: function() {
    var recordCount = this.state.recordCount;
    var clipsText = React.DOM.span({className: 'f22 mr20'}, 'Clips');
    var countText = React.DOM.b(null, recordCount);
    var advFilter = React.DOM.div({className:'adv-holder'},
      React.DOM.a({className:'adv-search animate ui-explore-filter'}, 'Advanced Search'));
    var container = React.DOM.span(null, clipsText,countText, advFilter);
    
    return React.DOM.div({className:'page-title bb'}, container);
  }
});
