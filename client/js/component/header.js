'use strict';

var AppAction = require('../action/appAction'),
    AppStore = require('../store/appStore'),
    Img = require('../component/image'),
    AppSwitcher = require('../component/appSwitcherMenu'),
    UserMenu = require('../component/userMenu'),
    React = require('react');

/***************************
 * Left Container
 ****************************/
var LeftContainer = React.createClass({
    toggleHamburger: function(event) {
        AppAction.toggleHamburger();
    },
    render: function() {
        //hambergher icon
        var icon = React.DOM.div({className:'header-icon'}, React.DOM.span({
            className: 'icon-prop animation clickable',
            onClick: this.toggleHamburger
        }, 'k')) ;
        //logo
        var img = React.createElement(Img, {
            src: 'images/broadcaster-header-assets/broadcaster-logo.png',
            className: 'header-logo clickable'
        });
        return React.DOM.div({
            className: 'header-left-section'
        }, icon, img);
    }
});

/***************************
 * Middle Container
 ****************************/
var MiddleContainer = React.createClass({
    setSearchTerms: function(event) {
        this.setState({
            searchTerms: event.target.value
        });
    },
    onSearchTermChange: function() {
        var searchTerms = AppStore.getSearchTerms();
        this.setState({
            searchTerms: searchTerms
        });
    },
    keyEvent: function(event) {
        var charCode = event.charCode;
        //fire off search when enter is pressed
        if (charCode === 13) {
            console.log(this.state.searchTerms);
            this.submitSearchTerm(this.state.searchTerms);
        }
    },
    submitButtonClick: function(event) {
        this.submitSearchTerm(this.state.searchTerms);
    },
    submitSearchTerm: function(searchTerms) {
        if (!searchTerms) {
            return;
        }

        AppAction.changeSearchTerm(searchTerms);
    },
    componentDidMount: function() {
        this.setState({
            data: AppStore.getSearchResults()
        });
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    getInitialState: function() {
        return {
            data: [],
            searchTerms: ''
        };
    },
    render: function() {
        //search button
        var button = React.DOM.div({
                className: 'header-button-search clickable',
                onClick: this.submitButtonClick
            },
            React.DOM.span({
                className: 'icon-search icon-prop animation header-icon'
            }));
        //search input
        var input = React.DOM.input({
            type: 'text',
            placeholder: 'Explore...',
            onKeyPress: this.keyEvent,
            onChange: this.setSearchTerms,
            value: this.state.searchTerms
        });
        //search container
        var container = React.DOM.div({
            className: 'header-search-container header-input-search'
        }, input, button);
        return React.DOM.div({
            className: 'header-middle-section'
        }, container);
    }
});

/***************************
 * Right Container
 ****************************/
var RightContainer = React.createClass({
    getInitialState: function() {
        return {
            user: this.props.user,
            showAppSwitcher: false,
            showUserMenu: false
        };
    },
    userChange: function() {
        this.setState({
            user: AppStore.getUser()
        });
    },
    componentDidMount: function() {
        AppStore.addChangeUserListener(this.userChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeUserListener(this.userChange);
    },
    toggleAppSwitcher: function() {
        this.setState({
            showAppSwitcher: !this.state.showAppSwitcher
        });
    },
    toggleAppUserMenu: function() {
        this.setState({
            showUserMenu: !this.state.showUserMenu
        });
    },
    render: function() {
        //hambergher icon
        var icon = React.DOM.div({className:'header-icon header-app-switcher'}, React.DOM.span({
            className: 'icon-prop animation clickable',
            onClick: this.toggleAppSwitcher
        }, '0'), React.createElement(AppSwitcher, {
            showAppSwitcher: this.state.showAppSwitcher,
            appName: 'Explore',
            appIcon: '6',
            href: '/consumer'
        }));
        //logo
        var img = React.createElement(Img, {
            src: this.state.user.image,
            className: 'clickable'
        });
        var imgContainer = React.DOM.div({
            className: 'header-avatar-container',
            onClick: this.toggleAppUserMenu
        }, img, React.createElement(UserMenu, {
                showUserMenu: this.state.showUserMenu
            }))
        return React.DOM.div({
            className: 'header-right-section'
        }, icon, imgContainer);
    }
});

/***************************
 * Parent Header Container
 ****************************/
module.exports = React.createClass({
    getInitialState: function() {
        return {
            user: this.props.user
        };
    },
    render: function() {
        var left = React.createElement(LeftContainer, {
                className: 'header-left-section'
            }),
            right = React.createElement(RightContainer, {
                className: 'header-right-section',
                user: this.state.user
            }),
            middle = React.createElement(MiddleContainer);

        return React.DOM.div({
            className: 'header-container'
        }, left, middle, right)
    }
});
