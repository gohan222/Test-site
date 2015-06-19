'use strict';

var $ = require('jquery'),
AppAction = require('../action/appAction'),
AppStore = require('../store/appStore'),
React = require('react');

module.exports = React.createClass({
  setSearchTerms: function(event){
    this.setState({searchTerms: $('#ui-search-text').val()});
  },
  onSearchTermChange: function(){
    var searchTerms = AppStore.getSearchTerms();
    this.setState({searchTerms: searchTerms});
  },
  keyEvent: function(event) {
    var charCode = event.charCode;
    //fire off search when enter is pressed
    if(charCode === 13){
      console.log(this.state.searchTerms);
      AppAction.changeSearchTerm(this.state.searchTerms);
    }
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResults()});
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
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
