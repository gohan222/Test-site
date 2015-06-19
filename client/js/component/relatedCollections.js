'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
React = require('react');

var RelatedCollection = React.createClass({
  
  render: function() {
    
    //add background image
    var backgroundStyle = {backgroundImage:'url(' + this.props.data.collectionImage + ')',
                           backgroundSize: 'cover' }
    var backgroundImage = React.DOM.a(null, React.DOM.div({className: 'coll-cover', style:backgroundStyle}));

    //collection name
    var collectionTextName = React.DOM.a(null,this.props.data.collectionName);
    
    //colleciton description
    var collectionTextDescription = React.DOM.a(null, React.DOM.p(null, this.props.data.collectionDescription));
    
    //collection owner
    var backgroundOwnerUrl =  this.props.data.usersPaged.records && this.props.data.usersPaged.records.length > 0 ? this.props.data.usersPaged.records[0].kvp.image : '';

    var backgroundOwnerStyle = {backgroundImage:'url(' + backgroundOwnerUrl + ')',
                           backgroundSize: 'cover' }
    var backgroundOwnerImage = React.DOM.div({className: 'avtr-60px', style:backgroundOwnerStyle});

    var ownerName =  this.props.data.usersPaged.records ? this.props.data.usersPaged.records[0].kvp.firstName : '',
        ownerLast = this.props.data.usersPaged.records ? this.props.data.usersPaged.records[0].kvp.lastName : '';
    var collectionOwnerTitle = React.DOM.div({className:'avtr-title'},
      React.DOM.span({className:'f12 c666'},'Cureated by'),
      React.DOM.br(null,null),
      React.DOM.span({className:'f16 bold'}, ownerName + ' ' + ownerLast ));
    
    var collectionOwnerDiv = React.DOM.div({className:'cr_info'},backgroundOwnerImage, collectionOwnerTitle);
    var collectionOwner = React.DOM.a(null, collectionOwnerDiv);

    var collectionDetail = React.DOM.div({className:'p15'}, collectionTextName, collectionTextDescription, collectionOwner);
    
    var container = React.DOM.div({className: 'coll-prv'}, backgroundImage, collectionDetail);
  
    return container;
  }
});

module.exports = React.createClass({
  onChange: function() {
    //first we remove the data before adding new list to animate the draw.
    this.setState({relatedCollections: AppStore.getRelatedCollections()});
  },
  onSearchTermChange: function(){
    this.setState({relatedCollections: []});
    AppAction.getRelatedCollections(AppStore.getSearchTerms());
  },
  componentDidMount: function() {
    this.setState({data: AppStore.getSearchResultsCount()});
    AppStore.addChangeRelatedCollectionsListener(this.onChange);
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeRelatedCollectionsListener(this.onChange);
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
  },
  getInitialState: function() {
    return {relatedCollections: []};
  },
  render: function() {
    var subset = [];
    if (!this.state.relatedCollections){
      return React.DOM.ul({className:'rel-search'});
    }

    //only display 10 items.
    subset = this.state.relatedCollections.slice(0,9);

    var relatedCollectionsNodes = subset.map(function (relatedCollection) {
      return React.createElement(RelatedCollection, {data:relatedCollection});
    });
    var animationElement = React.createElement(React.addons.CSSTransitionGroup,{transitionName: 'coll-prv', transitionAppear:true, transitionLeave:true, transitionEnter: true},relatedCollectionsNodes);
    return React.DOM.div(null, animationElement);
  }
});
