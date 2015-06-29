'use strict';

var AppStore = require('../store/appStore'),
Img = require('../component/image'),
React = require('react');

var staticData =['Dashboard',
                  'Campaigns',
                  'Buys',
                  'Tracking & Reporting',
                  'Media Kit',
                  'Collections',
                  'Clients',
                  'Search',
                  'Account'
                  ];
var HamburgerItem = React.createClass({
  render:function(){
    return React.DOM.li({className:'hamburger-item clickable'},
      React.DOM.span(null,this.props.data));
  }
});

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
    return {data: staticData};
  },
  render: function() {
    var itemNodes = this.state.data.map(function (item) {
      return React.createElement(HamburgerItem, {data:item});
    });
    
    //add logo
    var img = React.createElement(Img,{ className: 'hamburger-logo', src:'image/hamburger-menu-assets/veritone-logo.png'});
    var logo = React.DOM.div({className:'hamburger-item-logo'},
      img,
      React.DOM.div(null,'Privacy Policy | Terms and Conditions'),
      React.DOM.br(),
      React.DOM.div(null,'Copyright 2015'));

    return React.DOM.div({className:'hamburger-container'}, React.DOM.ul({className:'hamburger-list'},itemNodes), logo);
  }
});
