var React = require('react');

var MenuItem = React.createClass({
  render:function(){
    var text = React.DOM.span({className:'icon-'}, this.props.appIcon),
    container = React.DOM.a({className:'icon-prop app-switch-menuItem animate', href:this.props.href}, text, this.props.appName);
    return container;
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {show:this.props.showAppSwitcher};
  },

  componentDidMount: function() {
  },

  render: function() {
    var consumerMenu = React.createElement(MenuItem, {appName: this.props.appName, appIcon: this.props.appIcon, href:this.props.href}),
    container = React.DOM.div({className:'app-menu sh-ani ui-pf-sel', hidden:!this.state.show}, consumerMenu);

    return container;
  }
});