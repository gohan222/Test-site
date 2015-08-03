'use strict';

var React = require('react'),
$ = require('jquery'),
Constants = require('../constant/appConstant'),
AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
Filter = require('../component/filter'),
RelatedTopics = require('../component/relatedTopics'),
RelatedCollections = require('../component/relatedCollections'),
ReactRouter = require('react-router');

var buttonGroup = [{view: '/consumer/search' ,icon: 'glyphicon glyphicon-list'},
                  {view: '/consumer/program' ,icon: 'glyphicon glyphicon-align-left'}];

var CollectionHeader = React.createClass({
  render: function(){
    return React.DOM.div({className:'page-title bb'},
        React.DOM.a({className:'goright f13'}, 'View All Related Collections'),
        React.DOM.span({className:'f22 mr20', style:{paddingTop:'10px'}}, 'Collections')
        );
  }
});

module.exports = React.createClass({
  mixins: [ ReactRouter.State ],
  onViewChange: function(){
    // this.setState({view:AppStore.getView()});
  },
  componentWillMount:function(){
    //initialize data store before mounting values.
    /*if(this.props.query.q){
      AppAction.changeSearchTerm(this.props.query.q);
    }*/
  },
  componentDidMount: function() {
      AppStore.addChangeViewListener(this.onViewChange);
  },
  componentWillUnmount: function() {
      AppStore.removeChangeViewListener(this.onViewChange);
  },
  render: function() {
    
    var leftViewStyle = this.isActive('consumer') && this.isActive('program')? 'exp-col1 exp-col1-expand resize-animation ui-exp-coll min-height' : 'exp-col1 resize-animation ui-exp-coll min-height';
    var appView = ReactRouter.RouteHandler;
    var leftView = React.DOM.div({className:leftViewStyle}, React.createElement(Filter,{buttonGroup: buttonGroup}), React.createElement(appView));
    var rightView = React.DOM.div({className:'exp-col2'}, React.createElement(CollectionHeader), React.createElement(RelatedCollections));
    var columnView = React.DOM.div({className:'exp-column-container'},leftView,rightView);

    return React.DOM.div({className:'min-height active'},
      React.createElement(RelatedTopics), 
      columnView
      );
  }
});