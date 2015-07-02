'use strict';

var React = require('react'),
AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
LazyLoadImg = require('../component/image'),
Constants = require('../constant/appConstant');

var Mention = React.createClass({
	getSnippetText: function(snippets){
    var text = '';
    if (!snippets){
      return text;
    }

    for (var i = 0; i < snippets.length; i++) {
      text += snippets[i].text;
    };

    return text;
  },
	render: function() {
    
    var backgroundImage = React.DOM.div({className: 'prog-avtr'},
                          React.createElement(LazyLoadImg,{src: this.props.data.programLiveImage, className:'prog-avtr-style'}));

    //add porgram name
    var arrowIcon  = React.DOM.a({className: 'blue-play'});
    var programName  = React.DOM.div({className: 'm5 bold'}, React.DOM.a(null,this.props.data.programName));
    var airDate = React.DOM.i({className: 'mention-air-date'}, 'Air date: ' + this.props.data.mediaStartTime);
    var programNameContainer = React.DOM.div({className: 'prog-title'},arrowIcon, programName,airDate);

    //add mention snippet
    var mentionSnippet = React.DOM.p({className: 'program-list-mention-text'}, React.DOM.span({className:'cur-point ui-snip-text'}, this.getSnippetText(this.props.data.mentionSnippet)));

    var holder = React.DOM.div({className: 'ui-program-au-holder'},backgroundImage, programNameContainer, mentionSnippet);
    
  
    return holder;
  }	
});

var ProgramRow = React.createClass({
  render: function() {
  	var mentionNodes = this.props.data.map(function (mention) {
      return React.createElement(Mention, {data:mention});
    });

    var container = React.DOM.li({className:'ui-program-search-item'}, mentionNodes);
  
    return container;
  }
});

module.exports = React.createClass({
  sortData:function(mentions){
  	var hash = {};
  	var collection = [];

  	if(!mentions){
  		return collection;
  	}

  	for (var i = 0; i < mentions.length; i++) {
  		var mention = mentions[i];
  		if (!hash[mention.programId]){
  			hash[mention.programId] = [mention];
  			collection.push(hash[mention.programId]);
  		}else{
  			hash[mention.programId].push(mention);
  		}
  	};

  	console.log(collection);
  	return collection;
  },
  onChange: function() {
    //first we remove the data before adding new list to animate the draw.
    this.setState({data: this.sortData(AppStore.getSearchResults())});
  },
  onSearchTermChange: function(){
    this.setState({data: []});
    AppAction.searchInit(AppStore.getSearchTerms());
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
  },
  getInitialState: function() {
  	var result = this.sortData(AppStore.getSearchResults());
  	return {data: result};
  },
  render: function() {
  	var programNodes = this.state.data.map(function (mentions) {
      return React.createElement(ProgramRow, {data:mentions});
    });

    return React.DOM.ul({className: 'results'}, programNodes);
  }
});
