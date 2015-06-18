'use strict';

var $ = require('jquery'),
AppAction = require('../action/appAction'),
React = require('react');

module.exports = React.createClass({
  setSearchTerms: function(){
    this.setState({searchTerms: $('#ui-search-text').val()});
  },

  keyEvent: function(event) {
    var charCode = event.charCode;
    //fire off search when enter is pressed
    if(charCode === 13){
      console.log(this.state.searchTerms);
      AppAction.changeSearchTerm(this.state.searchTerms);
      AppAction.searchInit(this.state.searchTerms);
    }
  },
  getInitialState: function() {
    return {data: [], searchTerms: ''};
  },
  render: function() {
    var searchTerm = this.state.searchTerms;
    var child = React.DOM.a({className:'search-btn s-animate'});
    return React.DOM.input({id: 'ui-search-text',name: 'mentionList', type:'text', className:'blank', placeholder:'Explore...', onKeyPress:this.keyEvent, onChange: this.setSearchTerms, value:searchTerm}, child);
  }
});
