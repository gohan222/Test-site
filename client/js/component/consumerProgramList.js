'use strict';

var React = require('react'),
AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
LazyLoadImg = require('../component/image'),
TimeAgo = require('react-timeago'),
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
    
    // var backgroundImage = React.DOM.div({className: 'prog-avtr'},
                          // React.createElement(LazyLoadImg,{src: this.props.data.programLiveImage, className:'prog-avtr-style'}));

    //add porgram name
    // var arrowIcon  = React.DOM.a({className: 'blue-play'});
    // var programName  = React.DOM.div({className: 'm5 bold'}, React.DOM.a(null,this.props.data.programName));

    var airDate = React.DOM.i({className: 'mention-air-date'}, React.createElement(TimeAgo, {date: this.props.data.mediaStartTime}));
    // var airDate = React.DOM.i({className: 'mention-air-date'}, React.createElement(TimeAgo, {date: new Date()}));
    var animationElement = React.createElement(React.addons.CSSTransitionGroup,{transitionName: 'component', transitionAppear:true, transitionLeave:true, transitionEnter: true},airDate);
    // var programNameContainer = React.DOM.div({className: 'prog-title'},arrowIcon, programName,airDate);

    //add mention snippet
    var mentionSnippet = React.DOM.p({className: 'program-list-mention-text'}, React.DOM.span({className:'cur-point ui-snip-text'}, this.getSnippetText(this.props.data.mentionSnippet)));

    var holder = React.DOM.div({className: 'ui-program-au-holder'}, mentionSnippet, animationElement);
    
  
    return holder;
  }	
});

var ProgramRow = React.createClass({
  render: function() {
  	var mentionNodes = this.props.data.map(function (mention) {
      return React.createElement(Mention, {data:mention});
    });

    //referenced mention
    var refmention = this.props.data[0];

    //program info
    var programInfo = React.DOM.div();
    var backgroundImage = React.DOM.div({className: 'prog-avtr2'},
                          React.createElement(LazyLoadImg,{src: refmention.programLiveImage, className:'prog-avtr-style'}));

    //add porgram name
    // var arrowIcon  = React.DOM.a({className: 'blue-play'});
    var programName  = React.DOM.div({className: 'm5 bold'}, React.DOM.a(null,refmention.programName));
    var programNameContainer = React.DOM.div({className: 'prog-title2'}, programName);

    var programContainer = React.DOM.div({className:'program-container'}, backgroundImage, programNameContainer)

    var animationElement = React.createElement(React.addons.CSSTransitionGroup,{transitionName: 'component', transitionAppear:true, transitionLeave:true, transitionEnter: true},mentionNodes);
    var container = React.DOM.li({className:'ui-program-search-item'}, programContainer, React.DOM.div({className:'program-list-mention-container'}, animationElement));
    
    return container;
  }
});

module.exports = React.createClass({
  sortedResult:null,
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
  getProgramSearches:function(sortedMention){
    for (var i = 0; i < sortedMention.length; i++) {
      var mention = sortedMention[i][0];
      AppAction.getSearchByProgramId(mention.programId, AppStore.getSearchTerms());
    };    
  },
  onChange: function() {
    //first we remove the data before adding new list to animate the draw.
    this.sortedResult = this.sortData(AppStore.getSearchResults());
    this.setState({data: this.sortedResult});
    this.getProgramSearches(this.sortedResult);
  },
  onSearchTermChange: function(){
    this.setState({data: []});
    AppAction.searchInit(AppStore.getSearchTerms());
  },
  onProgramSearchResult: function(){
    var programSearchResult = AppStore.getProgramsSearch();
    if(!programSearchResult || programSearchResult.length === 0){
      return;
    }

    var mention = programSearchResult[0],
    mentionsList = null;
    for (var i = 0; i < this.sortedResult.length; i++) {
        if(this.sortedResult[i][0].programId === mention.programId){
          this.sortedResult[i] = programSearchResult;
          break;
        }
    };

    this.setState({data: this.sortedResult});
  },
  componentDidMount: function() {
    AppStore.addChangeListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    AppStore.addChangeProgramSearchListener(this.onProgramSearchResult);

    if(this.state.searchTerms){
      AppAction.searchInit(this.state.searchTerms);  
    }
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    AppStore.removeChangeProgramSearchListener(this.onProgramSearchResult);
  },
  getInitialState: function() {
  	this.sortedResult = this.sortData(AppStore.getSearchResults());
    //this.getProgramSearches(this.sortedResult);
    return {data: this.sortedResult, searchTerms: AppStore.getSearchTerms()};
  },
  render: function() {
  	var programNodes = this.state.data.map(function (mentions) {
      return React.createElement(ProgramRow, {data:mentions});
    });

    return React.DOM.ul({className: 'results'}, programNodes);
  }
});
