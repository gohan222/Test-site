'use strict';

var AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
AppStore = require('../store/appStore'),
React = require('react');

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
    var mentionNodes = this.props.data.map(function (mention) {
      return React.createElement(Mention, {data:mention});
    });
    return React.DOM.ul({className: 'results'}, mentionNodes);
  }
});

module.exports = React.createClass({
  onChange: function() {
    this.setState({data: AppStore.getSearchResults()});
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResults()});
    AppStore.addChangeListener(this.onChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.onChange);
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return React.createElement(MentionList, {data:this.state.data});
  }
});
