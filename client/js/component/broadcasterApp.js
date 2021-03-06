'use strict';

var React = require('react'),
    AppAction = require('../action/appAction'),
    AppStore = require('../store/appStore'),
    Constants = require('../constant/appConstant'),
    TrendBody = require('../component/trend'),
    Header = require('../component/header'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    ReactRouter = require('react-router');


module.exports = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.Navigation, PureRenderMixin],
    onViewChange: function() {
        var views = '',
            query = null;
        if (AppStore.getView() === Constants.VIEW_TOP_TRENDS_LIST) {
            views = 'trending';
        } else {
            views = 'search';
            query = AppStore.getSearchTerms() ? {
                q: AppStore.getSearchTerms()
            } : null;
        }


        if (this.props.params.views !== views) {
            try {
                this.transitionTo('trends', {
                    views: views
                }, query);
            } catch (err) {
                console.log(err);
            }
        }
    },
    onSearchTermChange: function() {
        if (this.props.query.q !== AppStore.getSearchTerms()) {
            //throws error on server.  catch the error
            try {
                this.transitionTo('trends', {
                    views: this.props.params.views
                }, {
                    q: AppStore.getSearchTerms()
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    onScroll: function(detail, view){
        
        var scrollContainer = this.refs.appContent.getDOMNode(),
        clientHeight = scrollContainer.clientHeight,
        scrollPos = scrollContainer.scrollTop;

        AppAction.updateScroll(true, clientHeight, scrollPos);
        if(this.scrollTimerId){
            clearTimeout(this.scrollTimerId);
        }
        
        this.scrollTimerId = setTimeout(function(){
            AppAction.updateScroll(false, clientHeight, scrollPos);
        },200)
    },
    componentDidMount: function(){
        var scrollContainer = this.refs.appContent.getDOMNode();
        AppAction.updateScroll(false, scrollContainer.clientHeight, scrollContainer.scrollTop);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeViewListener(this.onViewChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillReceiveProps: function(nextProps) {
        var view;

        if (nextProps.query.q && nextProps.query.q !== AppStore.getSearchTerms()) {
            AppAction.changeSearchTerm(nextProps.query.q);
        }

        if (nextProps.params.views && nextProps.params.views === 'trending') {
            view = Constants.VIEW_TOP_TRENDS_LIST;
        } else if (nextProps.params.views === 'search') {
            view = Constants.VIEW_TRENDING_SEARCH_TERMS_LIST;
        }

        if (view && view !== AppStore.getView()) {
            AppAction.changeView(view);
        }
    },
    componentWillMount: function() {
        //initialize data store before mounting values.
        if (this.props.query.q) {
            AppAction.changeSearchTerm(this.props.query.q);
        }

        if (this.props.params.views === 'trending') {
            AppAction.changeView(Constants.VIEW_TOP_TRENDS_LIST);
        } else {
            AppAction.changeView(Constants.VIEW_TRENDING_SEARCH_TERMS_LIST);
        }

        AppStore.addChangeViewListener(this.onViewChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    render: function() {
        return React.DOM.div({
                className: 'content-container  animation-3'
            },
            React.DOM.div({
                    id: 'app-header'
                },
                React.createElement(Header,
                    this.props
                )),
            React.DOM.div({
                id: 'app-content',
                onScroll: this.onScroll,
                ref:'appContent'
            }, React.createElement(TrendBody,
                this.props
            ))
        );
    }
});
