'use strict';

var React = require('react'),
$ = require('jquery'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
Filter = require('../component/filter'),
RelatedTopics = require('../component/relatedTopics'),
RelatedCollections = require('../component/relatedCollections'),
ConsumerViewContainer = require('../component/consumerViewContainer'),
BroadcasterViewContainer = require('../component/broadcasterViewContainer');

var buttonGroup = [{view: Constants.VIEW_MENTION_LIST ,icon: 'glyphicon glyphicon-list'},
                  {view: Constants.VIEW_PROGRAM_LIST ,icon: 'glyphicon glyphicon-align-left'}];

var CollectionHeader = React.createClass({
  render: function(){
    return React.DOM.div({className:'page-title bb'},
        React.DOM.a({className:'goright f13'}, 'View All Related Collections'),
        React.DOM.span({className:'f22 mr20', style:{paddingTop:'10px'}}, 'Collections')
        );
  }
});

module.exports = React.createClass({
  onViewChange: function(){
    var view = AppStore.getView();
    if(view === Constants.VIEW_PROGRAM_LIST){
      $('.exp-col1').addClass('exp-col1-expand');
    }else{
      $('.exp-col1').removeClass('exp-col1-expand');
    }
  },
  componentDidMount: function() {
      AppStore.addChangeViewListener(this.onViewChange);
  },
  componentWillUnmount: function() {
      AppStore.removeChangeViewListener(this.onViewChange);
  },
  render: function() {

    var appView = this.props.app === Constants.APP_BROADCASTER ? BroadcasterViewContainer : ConsumerViewContainer
    var leftView = React.DOM.div({className:'exp-col1 animation-3 ui-exp-coll min-height'}, React.createElement(Filter,{buttonGroup: buttonGroup}), React.createElement(appView));
    var rightView = React.DOM.div({className:'exp-col2'}, React.createElement(CollectionHeader), React.createElement(RelatedCollections));
    var columnView = React.DOM.div({className:'exp-column-container'},leftView,rightView);

    return React.DOM.div({className:'min-height active'},
      React.createElement(RelatedTopics), 
      columnView
      );
  }
});