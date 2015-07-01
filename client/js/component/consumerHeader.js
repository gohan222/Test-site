'use strict';

var AppAction = require('../action/appAction'),
    AppStore = require('../store/appStore'),
    Login = require('../component/login'),
    Img = require('../component/image'),
    React = require('react');

/***************************
 * Left Container
 ****************************/
var LeftContainer = React.createClass({
    toggleHamburger: function(event) {
        AppAction.toggleHamburger();
    },
    render: function() {
        //logo
        var img = React.createElement(Img, {
            src: 'images/consumer-headers-assets/logosearch-button.png',
            className: 'header-consumer-logo clickable'
        });
        return React.DOM.div({
            className: 'header-consumer-left-section'
        }, img);
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
                className: 'header-consumer-button-search animate clickable',
                onClick: this.submitButtonClick
            },
            React.DOM.span({
                className: 'icon-search icon-prop header-consumer-icon'
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
            className: 'header-consumer-search-container header-consumer-input-search'
        }, input, button);
        return React.DOM.div({
            className: 'header-consumer-middle-section'
        }, container);
    }
});

/***************************
 * Right Container
 ****************************/
var RightContainer = React.createClass({
    loginModal: null,
    getInitialState: function() {
        return {
            user: null
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
    showLogin: function() {
        React.render(
            React.createElement(Login),
            document.getElementById('app-modal')
        );

    },
    render: function() {

        //menu items
        var product = React.DOM.div({
                className: 'header-consumer-menu-item icon-prop animate clickable'
            },
            React.DOM.span(null, 'Products'),
            React.DOM.i({
                className: 'fa fa-sort-desc'
            }));
        var developer = React.DOM.div({
                className: 'header-consumer-menu-item icon-prop animate clickable'
            },
            React.DOM.span(null, 'Developer'),
            React.DOM.i({
                className: 'fa fa-sort-desc'
            }));
        var about = React.DOM.div({
                className: 'header-consumer-menu-item icon-prop animate clickable'
            },
            React.DOM.span(null, 'About'),
            React.DOM.i({
                className: 'fa fa-sort-desc'
            }));

        var icon, img, imgContainer;

        if (this.state.user) {
            //app switcher icon
            icon = React.DOM.div({className:'header-consumer-app-switcher'}, React.DOM.span({
                className: 'icon-prop animation header-consumer-icon clickable'
            }, '0'));
            //logo
            img = React.createElement(Img, {
                src: 'https://s3.amazonaws.com/prod-veritone-ugc/67e2daa5-fb3d-4e60-baef-15ed0510c88a%2Favatar%2FKsu3J4miTciq8EEoTHqk_IMG_1641.jpg',
                className: 'clickable'
            });
            imgContainer = React.DOM.div({
                className: 'header-consumer-menu-item header-consumer-avatar-container clickable'
            }, img);
        } else {
            //logged out
            icon = React.DOM.div({
                    className: 'header-consumer-button-signup blue-btn clickable'
                },
                React.DOM.span(null, 'Sign Up'));
            imgContainer = React.DOM.div({
                    className: 'header-consumer-menu-item icon-prop animate clickable'
                },
                React.DOM.span({
                    onClick: this.showLogin
                }, 'Login'));
        }

        return React.DOM.div({
                className: 'header-consumer-right-section'
            },
            product,
            developer,
            about,
            icon,
            imgContainer
        );
    }
});

/***************************
 * Parent Header Container
 ****************************/
module.exports = React.createClass({
    render: function() {
        var left = React.createElement(LeftContainer, {
                className: 'header-consumer-left-section'
            }),
            right = React.createElement(RightContainer, {
                className: 'header-consumer-right-section'
            }),
            middle = React.createElement(MiddleContainer);

        return React.DOM.div({
            className: 'header-consumer-container'
        }, left, middle, right)
    }
});
