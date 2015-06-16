'use strict';
var logger = require('../logger/logger'),
  browserify = require('browserify'),
  literalify = require('literalify'),
  React = require('react'),
  DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
  // This is our React component, shared by server and browser thanks to browserify
  App = React.createFactory(require('../templates/homepage'));

module.exports = React.createClass({

  // For ease of illustration, we just use the React JS methods directly
  // (no JSX compilation needed)
  // Note that we allow the button to be disabled initially, and then enable it
  // when everything has loaded
  render: function() {

    return div(null,

      button({onClick: this.handleClick, disabled: this.state.disabled}, 'Add Item'),

      ul({children: this.state.items.map(function(item) {
        return li(null, item)
      })})

    )
  },
})