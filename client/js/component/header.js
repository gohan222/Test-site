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
  toggleHamburger: function(event){
    AppAction.toggleHamburger();
  },
  render:function(){
    //hambergher icon
    var icon = React.DOM.span({className:'icon-icon-hamburger icon-prop animation header-icon clickable',
                onClick: this.toggleHamburger});
    //logo
    var img = React.createElement(Img,{src: 'image/broadcaster-header-assets/broadcaster-logo.png', className:'header-logo clickable'});
    return React.DOM.div({className:'header-left-section'}, icon, img);
  }
});

/***************************
* Middle Container
****************************/
var MiddleContainer = React.createClass({
  setSearchTerms: function(event){
    this.setState({searchTerms: event.target.value});
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
      this.submitSearchTerm(this.state.searchTerms);
    }
  },
  submitButtonClick: function(event){
    this.submitSearchTerm(this.state.searchTerms);
  },
  submitSearchTerm: function(searchTerms){
    if(!searchTerms){
      return;
    }

    AppAction.changeSearchTerm(searchTerms);
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
  render:function(){
    //search button
    var button = React.DOM.div({className:'header-button-search blue-btn clickable', onClick: this.submitButtonClick}, 'Search');
    //search input
    var input = React.DOM.input(
      {className:'header-input-search', 
      type:'text', 
      placeholder:'Explore...',
      onKeyPress:this.keyEvent, 
      onChange: this.setSearchTerms, 
      value: this.state.searchTerms});
    //search container
    var container = React.DOM.div({className:'header-search-container'}, input, button);
    return React.DOM.div({className:'header-middle-section'}, container);
  }
});

/***************************
* Right Container
****************************/
var RightContainer = React.createClass({
  render:function(){
    //hambergher icon
    var icon = React.DOM.span({className:'icon-icon-appswitcher icon-prop animation header-icon header-app-switcher clickable'});
    //logo
    var img = React.createElement(Img, {src: 'https://s3.amazonaws.com/prod-veritone-ugc/67e2daa5-fb3d-4e60-baef-15ed0510c88a%2Favatar%2FKsu3J4miTciq8EEoTHqk_IMG_1641.jpg', className:'clickable'});
    var imgContainer = React.DOM.div({className:'header-avatar-container'}, img)
    return React.DOM.div({className:'header-right-section'}, icon, imgContainer);
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