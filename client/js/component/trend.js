'use strict';

var React = require('react'),
Constants = require('../constant/appConstant'),
Filter = require('../component/filter'),
ReactRouter = require('react-router'),
AppStore = require('../store/appStore'),
BroadcasterViewContainer = require('../component/broadcasterViewContainer');

var buttonGroup = [{view: Constants.VIEW_TOP_TRENDS_LIST ,icon: 'glyphicon glyphicon-stats'},
                  {view: Constants.VIEW_TRENDING_SEARCH_TERMS_LIST ,icon: 'glyphicon glyphicon-signal'}];

module.exports = React.createClass({
  mixins: [ReactRouter.State],
    onViewChange: function() {
        this.setState({
            view: AppStore.getView()
        });
    },
    componentDidMount: function() {
        AppStore.addChangeViewListener(this.onViewChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeViewListener(this.onViewChange);
    },
    getInitialState: function() {
        var view = '';

        if (this.props.params.views) {
            view = this.props.params.views === 'trending' ? Constants.VIEW_TOP_TRENDS_LIST : Constants.VIEW_TRENDING_SEARCH_TERMS_LIST
        } else {
            view = AppStore.getView();
        }

        return {
            view: view
        };
    },
  render: function() {

    var view = React.DOM.div({className:'ui-exp-coll'}, React.createElement(Filter,{app: this.props.app , buttonGroup: buttonGroup}), React.createElement(BroadcasterViewContainer));
    
    return React.DOM.div({className:'active'},
      view
      );
  }
});
