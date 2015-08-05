'use strict';

var React = require('react'),
    Constants = require('../constant/appConstant'),
    AppStore = require('../store/appStore'),
    ProgramList = require('../component/consumerProgramList'),
    MentionList = require('../component/consumerMentionList');

module.exports = React.createClass({
    onChange: function() {
        this.setState({
            view: AppStore.getView()
        });
    },
    componentDidMount: function() {
        AppStore.addChangeViewListener(this.onChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeViewListener(this.onChange);
    },
    /*componentWillReceiveProps: function(nextProps) {
        var view = '';

        if (nextProps.params.views) {
            view = nextProps.params.views === 'program' ? Constants.VIEW_PROGRAM_LIST : Constants.VIEW_SEARCH_LIST
        } else {
            view = AppStore.getView();
        }

        this.setState({
            view: view
        });
    },*/
    getInitialState: function() {
        var view = '';

        if (this.props.params.views) {
            view = this.props.params.views === 'program' ? Constants.VIEW_PROGRAM_LIST : Constants.VIEW_SEARCH_LIST;
        } else {
            view = AppStore.getView();
        }

        return {
            view: view
        };
    },
    render: function() {
        var viewElem;

        if (this.state.view === Constants.VIEW_PROGRAM_LIST) {
            viewElem = React.createElement(ProgramList);
        } else {
            viewElem = React.createElement(MentionList);
        }
        return viewElem;
    }
});
