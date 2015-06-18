'use strict';

var AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
AppStore = require('../store/appStore'),
// React = require('react'),
React = require('react/addons');

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
    
    //add background image
    var backgroundStyle = {backgroundImage:'url(' + this.props.data.programLiveImage + ')',
                           backgroundSize: 'cover' }
    var backgroundImage = React.DOM.div({className: 'prog-avtr', style:backgroundStyle});

    //add porgram name
    var arrowIcon  = React.DOM.a({className: 'blue-play'});
    var programName  = React.DOM.div({className: 'm5 bold'}, React.DOM.a(null,this.props.data.programName));
    var airDate = React.DOM.i({className: 'mention-air-date'}, 'Air date: ' + this.props.data.mediaStartTime);
    var programNameContainer = React.DOM.div({className: 'prog-title'},arrowIcon, programName,airDate);

    //add mention snippet
    var mentionSnippet = React.DOM.p({className: 'mention-snippet-text'}, React.DOM.span({className:'cur-point ui-snip-text'}, this.getSnippetText(this.props.data.mentionSnippet)));

    var holder = React.DOM.div({className: 'ui-au-holder'},backgroundImage, programNameContainer, mentionSnippet);
    var container = React.DOM.li({className:'ui-search-item'}, holder);
  
    return container;
  }
});

var MentionList = React.createClass({
  render: function() {
    if(!this.props.data){
      return React.DOM.ul({className: 'results'}, null);
    }

    var mentionNodes = this.props.data.map(function (mention) {
      return React.createElement(Mention, {data:mention});
    });

    var animationElement = React.createElement(React.addons.CSSTransitionGroup,{transitionName: 'ui-search-item', transitionAppear:true, transitionLeave:true, transitionEnter: true},mentionNodes);
    console.log(animationElement);
    return React.DOM.ul({className: 'results'}, animationElement);
  }
});

module.exports = React.createClass({
  onChange: function() {
    //first we remove the data before adding new list to animate the draw.
    this.setState({data: AppStore.getSearchResults()});
  },
  onSearchTermChange: function(){
    this.setState({data: []});
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResults()});
    AppStore.addChangeListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return React.createElement(MentionList, {data:this.state.data});
  }
});
