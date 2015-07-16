'use strict';

var React = require('react');

var MenuItem = React.createClass({
  render:function(){
    var icon = React.DOM.span({className:'icon-log-out'}),
    text = React.DOM.span(null, 'Logout'),
    container = React.DOM.li({className:'icon-prop'}, React.DOM.a({className:'icon-prop app-menuItem animate', href:'/logout'}, icon, text));
    return container;
  }
});

module.exports = React.createClass({
  render: function() {
    var userMenuList = React.DOM.ul({className:'dd-links sh-ani'}, React.createElement(MenuItem)) ,
    container = React.DOM.div({className:'logged_dd ui-user-menu', hidden:!this.props.showUserMenu}, userMenuList);

    return container;
  }
});