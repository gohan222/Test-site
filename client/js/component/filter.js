'use strict';

var AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    Constants = require('../constant/appConstant'),
    React = require('react');

var ViewButton = React.createClass({
    getInitialState: function() {
        return {
            recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0
        };
    },
    changeView: function() {
        AppAction.changeView(this.props.view);
    },
    render: function() {
        return React.DOM.button({
            className: 'btn btn-default',
            type: 'button',
            onClick: this.changeView
        }, React.DOM.span({
            className: this.props.icon
        }));
    }
});

module.exports = React.createClass({
    onChange: function() {
        this.setState({
            recordCount: AppStore.getSearchResultsCount()
        });
    },
    onSearchTermChange: function() {
        this.setState({
            recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0
        });
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this.onChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    getInitialState: function() {
        return {
            recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0
        };
    },
    changeListView: function() {
        AppAction.changeView(Constants.VIEW_MENTION_LIST);
    },
    changeProgramView: function() {
        AppAction.changeView(Constants.VIEW_PROGRAM_LIST);
    },
    render: function() {
        var recordCount = this.state.recordCount;
        var clipsText = React.DOM.span({
            className: 'f22 mr20'
        }, 'Clips');
        var countText = React.DOM.b(null, recordCount);
        var buttons = this.props.buttonGroup.map(function(button) {
            return React.createElement(ViewButton, {
                view: button.view,
                icon: button.icon
            });
        });
        var buttonBar = React.DOM.div({
                className: 'btn-group',
                role: 'group'
            },
            buttons);


        var container, advFilter;

        if (this.props.app === Constants.APP_BROADCASTER) {
            advFilter = React.DOM.div({
                    className: 'adv-holder-trend'
                },
                buttonBar);
            container = React.DOM.span(null, advFilter)
        } else {
            advFilter = React.DOM.div({
                    className: 'adv-holder'
                },
                buttonBar);
            container = React.DOM.span(null, clipsText, countText, advFilter);
        }


        return React.DOM.div({
            className: 'page-title bb'
        }, container);
    }
});
