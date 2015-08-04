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
    onViewChange: function() {
        var views = '';
        if (AppStore.getView() === Constants.VIEW_PROGRAM_LIST) {
            views = 'program';
        } else {
            views = 'search';
        }


        if (this.props.params.views !== views) {
            this.transitionTo('consumer', {
                views: views
            }, {
                q: AppStore.getSearchTerms()
            });
        }
    },
    onSearchTermChange: function() {
        if (this.props.query.q !== AppStore.getSearchTerms()) {
            this.transitionTo('consumer', {
                views: this.props.params.views
            }, {
                q: AppStore.getSearchTerms()
            });
        }
    },
    componentWillUnmount: function() {
        AppStore.removeChangeViewListener(this.onViewChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    //invoked when using browser back button.
    componentWillReceiveProps: function(nextProps) {
        var view;

        if (nextProps.query.q !== AppStore.getSearchTerms()) {
            AppAction.changeSearchTerm(nextProps.query.q);
        }

        if (nextProps.params.views === 'program') {
            view = Constants.VIEW_PROGRAM_LIST;
        } else if (nextProps.params.views === 'search') {
            view = Constants.VIEW_MENTION_LIST;
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
