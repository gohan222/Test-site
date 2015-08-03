'use strict';

var React = require('react'),
    AppAction = require('../action/appAction'),
    AppStore = require('../store/appStore'),
    Constants = require('../constant/appConstant'),
    SearchBody = require('../component/search'),
    Header = require('../component/consumerHeader'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    ReactRouter = require('react-router');


module.exports = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.Navigation, PureRenderMixin],
    onViewChange : function(){

    },
    onSearchTermChange : function(){
        console.log('Search Term Change');
        console.log(this.getPathname());
        console.log(AppStore.getSearchTerms());
        console.log(this.props);
        if(this.props.query.q !== AppStore.getSearchTerms()){
            this.transitionTo('consumer', {views: this.props.params.views}, {q: AppStore.getSearchTerms()});
        }
    },
    componentWillUnmount: function() {
        AppStore.removeChangeViewListener(this.onViewChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillMount: function() {
        //initialize data store before mounting values.
        if (this.props.query.q) {
            AppAction.changeSearchTerm(this.props.query.q);
        }

        if (this.props.params.views === 'program') {
            AppAction.changeView(Constants.VIEW_PROGRAM_LIST);
        } else {
            AppAction.changeView(Constants.VIEW_SEARCH_LIST);
        }

        AppStore.addChangeViewListener(this.onViewChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    render: function() {
        return React.DOM.div({
                className: 'content-container'
            },
            React.DOM.div({
                    id: 'app-header'
                },
                React.createElement(Header,
                    this.props
                )),
            React.DOM.div({
                id: 'app-content'
            }, React.createElement(SearchBody,
                this.props
            ))
        );
    }
});
