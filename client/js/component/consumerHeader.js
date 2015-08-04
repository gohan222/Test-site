'use strict';

var AppAction = require('../action/appAction'),
    AppStore = require('../store/appStore'),
    Login = require('../component/login'),
    Img = require('../component/image'),
    AppSwitcher = require('../component/appSwitcherMenu'),
    Progress = require('react-progress'),
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
        //logo
        var img = React.createElement(Img, {
            src: '/images/consumer-headers-assets/logosearch-button.png',
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
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    /*componentWillReceiveProps: function(nextProps) {
        var searchTerms = nextProps.query && nextProps.query.q ? nextProps.query.q : AppStore.getSearchTerms();

        this.setState({
            searchTerms: searchTerms ? searchTerms : ''
        });
    },*/
    getInitialState: function() {
        var searchTerms = this.props.query && this.props.query.q ? this.props.query.q : AppStore.getSearchTerms();

        return {
            data: [],
            searchTerms: searchTerms ? searchTerms : ''
        };
    },
    render: function() {
        //search button
        var button = React.DOM.div({
                className: 'header-consumer-button-search animation-2 clickable',
                onClick: this.submitButtonClick
            },
            React.DOM.span({
                className: 'icon-search icon-prop icon-prop-animation header-consumer-icon'
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
            user: this.props.user,
            showAppSwitcher: false,
            showUserMenu: false
        };
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
                className: 'header-consumer-menu-item icon-prop icon-prop-animation clickable'
            },
            React.DOM.span(null, 'Products'),
            React.DOM.i({
                className: 'fa fa-sort-desc'
            }));
        var developer = React.DOM.div({
                className: 'header-consumer-menu-item icon-prop icon-prop-animation clickable'
            },
            React.DOM.span(null, 'Developer'),
            React.DOM.i({
                className: 'fa fa-sort-desc'
            }));
        var about = React.DOM.div({
                className: 'header-consumer-menu-item icon-prop icon-prop-animation clickable'
            },
            React.DOM.span(null, 'About'),
            React.DOM.i({
                className: 'fa fa-sort-desc'
            }));

        var icon, img, imgContainer;

        if (this.state.user) {
            //app switcher icon
            icon = React.DOM.div({
                className: 'header-consumer-app-switcher'
            }, React.DOM.span({
                className: 'icon-prop icon-prop-animation header-consumer-icon clickable',
                onClick: this.toggleAppSwitcher
            }, '0'), React.createElement(AppSwitcher, {
                showAppSwitcher: this.state.showAppSwitcher,
                appName: 'Trends',
                appIcon: '6',
                href: '/trends'
            }));
            //logo
            img = React.createElement(Img, {
                src: this.state.user.image,
                className: 'clickable'
            });
            imgContainer = React.DOM.div({
                className: 'header-consumer-menu-item header-consumer-avatar-container clickable',
                onClick: this.toggleAppUserMenu
            }, img, React.createElement(UserMenu, {
                showUserMenu: this.state.showUserMenu
            }));
        } else {
            //logged out
            icon = React.DOM.div({
                    className: 'header-consumer-button-signup blue-btn clickable'
                },
                React.DOM.span(null, 'Sign Up'));
            imgContainer = React.DOM.div({
                    className: 'header-consumer-menu-item icon-prop icon-prop-animation clickable'
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
    progressChange: function() {
        this.setState({
            progress: AppStore.getProgress()
        });
    },
    componentDidMount: function() {
        AppStore.addChangeProgressListener(this.progressChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeProgressListener(this.progressChange);
    },
    getInitialState: function() {
        return {
            user: this.props.user,
            progress: 0
        };
    },
    render: function() {
        var left = React.createElement(LeftContainer, {
                className: 'header-consumer-left-section'
            }),
            right = React.createElement(RightContainer, {
                className: 'header-consumer-right-section',
                user: this.state.user
            }),
            middle = React.createElement(MiddleContainer, {
                query: this.props.query
            }),
            progress = React.createElement(Progress, {
                percent: this.state.progress,
                style: {
                    backgroundImage: 'linear-gradient(to right, #5ac8fa, #007aff, #34aadc)'
                }
            });

        if (this.state.progress >= 100) {
            var context = this;
            setTimeout(function() {
                context.setState({
                    progress: 0
                });
            }, 500);
        }

        var headerComponent;

        if (this.state.progress > 0) {
            headerComponent = React.DOM.div({
                className: 'header-consumer-container'
            }, left, middle, right, progress);
        } else {
            headerComponent = React.DOM.div({
                className: 'header-consumer-container'
            }, left, middle, right);
        }

        return headerComponent;
    }
});
