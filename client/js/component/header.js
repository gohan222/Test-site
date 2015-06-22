'use strict';

var $ = require('jquery'),
AppAction = require('../action/appAction'),
AppStore = require('../store/appStore'),
Img = require('../component/image'),
React = require('react');

/***************************
* Left Container
****************************/
var LeftContainer = React.createClass({
  render:function(){
    //hambergher icon
    var icon = React.DOM.span({className:'icon-icon-hamburger header-icon-size header-icon-hamburger'});
    //logo
    var img = React.createElement(Img,{src: 'image/broadcaster-header-assets/broadcaster-logo.png', className:'header-logo'});
    return React.DOM.div({className:'header-left-section'}, icon, img);
  }
});

/***************************
* Middle Container
****************************/
var MiddleContainer = React.createClass({
  render:function(){
    return React.DOM.div({className:'header-middle-section'});
  }
});

/***************************
* Right Container
****************************/
var RightContainer = React.createClass({
  render:function(){
    return React.DOM.div({className:'header-right-section'});
  }
});

/***************************
* Parent Header Container
****************************/
module.exports = React.createClass({
  render: function() {
    var left = React.createElement(LeftContainer,{className:'header-left-section'}),
    right = React.createElement(RightContainer,{className:'header-right-section'}),
    middle = React.createElement(MiddleContainer);
    
    return React.DOM.div({className: 'header-container'}, left,middle,right)
  }
});

/*module.exports = React.createClass({
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
});*/
