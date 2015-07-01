'use strict';

var AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    React = require('react');

var LoginPopup = React.createClass({
    username: null,
    password: null,
    close: function() {
        if (this.props.closeModal) {
            this.props.closeModal.apply(this, []);
        }
    },
    setUsername: function(event) {
        this.username = event.target.value;
    },
    setPassword: function(event) {
        this.password = event.target.value;
    },
    submitLogin: function() {
        AppAction.submitLogin(this.username, this.password);
    },
    componentDidMount: function() {
        AppStore.addChangeUserListener(this.close);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeUserListener(this.close);
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        var header = React.DOM.div({
                className: 'blue_head',
            }, 'Log In', React.DOM.div({
                className: 'b_close clickable',
                onClick: this.close
            })),
            formFields = React.DOM.form(null,
                React.DOM.input({
                    name: 'email',
                    placeholder: 'email',
                    onChange: this.setUsername,
                }),
                React.DOM.input({
                    name: 'password',
                    type: 'password',
                    placeholder: 'password',
                    onChange: this.setPassword,
                }),
                React.DOM.input({
                    className: 'signup clickable',
                    disabled:true,
                    value: 'Log in',
                    onClick: this.submitLogin
                })),
            formLayout = React.DOM.div({
                    className: 'pop_col1'
                },
                React.DOM.div({
                    className: 'twitter'
                }, 'Connect with Twitter'),
                React.DOM.br(),
                React.DOM.div({
                    className: 'm20'
                }, 'or'),
                React.DOM.div({
                    className: 'white_form m20'
                }, formFields)),
            bodyContainer = React.DOM.div({
                className: 'clear'
            }, formLayout),
            modalContainer = React.DOM.div({
                className: 'win_blue login-container'
            }, header, bodyContainer);

        return modalContainer;
    }
});

module.exports = React.createClass({
    closeModal: function() {
        React.unmountComponentAtNode(this.getDOMNode().parentNode);
    },
    componentDidMount: function() {
        // this.setState({data: AppStore.getSearchResultsCount()});
        // AppStore.addChangeRelatedTopicsListener(this.onChange);
        // AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillUnmount: function() {
        // AppStore.removeChangeRelatedTopicsListener(this.onChange);
        // AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        return React.DOM.div({
            className: 'modal-container'
        }, React.DOM.div({
            className: 'whitepop'
        }), React.createElement(LoginPopup, {
            closeModal: this.closeModal
        }));
    }
});
