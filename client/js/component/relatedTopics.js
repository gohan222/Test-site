'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
React = require('react');

var RelatedTopic = React.createClass({
  onClick: function(event){
    console.log(event);
    var selectedText = event.currentTarget.innerText;
    var searchTerms = AppStore.getSearchTerms();
    AppAction.changeSearchTerm( searchTerms + ' ' + selectedText);
  },
  render: function() {
    
    //add background image
    var holder = React.DOM.a({href:"javascript:;;", onClick:this.onClick}, this.props.data);
    var container = React.DOM.li(null, holder);
  
    return container;
  }
});

module.exports = React.createClass({
  onChange: function() {
    //first we remove the data before adding new list to animate the draw.
    this.setState({relatedTopics: AppStore.getRelatedTopics()});
  },
  onSearchTermChange: function(){
    this.setState({relatedTopics: []});
    AppAction.getRelatedTopics(AppStore.getSearchTerms());
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResultsCount()});
    AppStore.addChangeRelatedTopicsListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeRelatedTopicsListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
  },
  getInitialState: function() {
    return {relatedTopics: []};
  },
  render: function() {
    var subset = [];
    if (!this.state.relatedTopics){
      return React.DOM.ul({className:'rel-search'});
    }

    //only display 10 items.
    subset = this.state.relatedTopics.slice(0,9);

    var relatedTopicsNodes = subset.map(function (relatedTopic) {
      return React.createElement(RelatedTopic, {data:relatedTopic});
    });

    var listContainer = React.DOM.ul({className:'rel-search'}, React.DOM.li(null, 'Related Searches:'), relatedTopicsNodes);
    var container = React.DOM.div({className:'blue-bar'}, listContainer);
    
    return container;
  }
});