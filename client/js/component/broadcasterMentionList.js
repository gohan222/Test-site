'use strict';

var AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    LazyLoadImg = require('../component/image'),
    React = require('react/addons');

var Mention = React.createClass({
    getSnippetText: function(snippets) {
        var text = '';
        if (!snippets) {
            return text;
        }

        for (var i = 0; i < snippets.length; i++) {
            text += snippets[i].text;
        }

        return text;
    },
    render: function() {

        //add background image
        // var backgroundStyle = {backgroundImage:'url(' + this.props.data.programLiveImage + ')',
        //                        backgroundSize: 'cover' }
        var backgroundImage = React.DOM.div({
                className: 'goleft leftpart'
            },
            React.createElement(LazyLoadImg, {
                src: this.props.data.programLiveImage,
                className: 'bgfit avaimg circle inblock'
            }));

        //add mention snippet
        var mentionSnippet = React.DOM.div({
                className: 'mentionsexpand'
            },
            React.DOM.div({
                className: 'hasquote inblock'
            }, React.DOM.span({
                className: 'f14l quotetxt ellipsis'
            }, this.getSnippetText(this.props.data.mentionSnippet))));

        //add porgram name
        var arrowIcon = React.DOM.a({
            className: 'mediabtn playbtn', style:{marginRight:'10px'}
        });
        var advertiserName = React.DOM.div(null, this.props.data.advertiser);
        var audienceCount = React.DOM.div(null, this.props.data.audience);
        var spotType = React.DOM.div(null,'--');
        var status = React.DOM.div({className:'statusico'},
          React.DOM.i({className:'pend'}));
        var verify = React.DOM.div(null,'Verify');
        var programName = React.DOM.div({
            className: 'm5 bold'
        }, React.DOM.a(null, arrowIcon, this.props.data.programName));
        var airDate = React.DOM.i({
            className: 'mention-air-date'
        }, this.props.data.mediaStartTime);
        var programNameContainer = React.DOM.div({
                className: 'mentionsrowwrap ui-au-holder'
            },
            React.DOM.div({
                className: 'firstrow aligncol f14l clear'
            }, programName, airDate, advertiserName, audienceCount, spotType, status, verify), mentionSnippet);

        var holder = React.DOM.div({
            className: 'goright rightpart dashedbrdr'
        }, programNameContainer);
        var container = React.DOM.div({
            className: 'mentionsrow clear ui-mention-row ng-scope'
        }, backgroundImage, holder);

        return container;
    }
});

module.exports = React.createClass({
    onChange: function() {
        //first we remove the data before adding new list to animate the draw.
        this.setState({
            data: AppStore.getMentions()
        });
    },
    componentDidMount: function() {
        AppStore.addChangeMentionsListener(this.onChange);

        //init
        AppAction.getMentions();

    },
    componentWillUnmount: function() {
        AppStore.removeChangeMentionsListener(this.onChange);
    },
    getInitialState: function() {
        return {
            data: AppStore.getMentions()
        };
    },
    render: function() {
        if (!this.state.data) {
            return React.DOM.div({
                className: 'mentionscontent clear ui-mention-list'
            }, null);
        }

        var mentionNodes = this.state.data.map(function(mention) {
            return React.createElement(Mention, {
                data: mention
            });
        });
        var header = React.DOM.div({
                className: 'mentionshead clear'
            }, React.DOM.div({
                className: 'goleft leftpart'
            }),
            React.DOM.div({
                    className: 'goright rightpart aligncol'
                },
                React.DOM.div(null, 'Program'),
                React.DOM.div(null, 'Date'),
                React.DOM.div(null, 'Advertiser'),
                React.DOM.div(null, 'Spot Type'),
                React.DOM.div(null, 'Status'),
                React.DOM.div()
            ));

        var animationElement = React.createElement(React.addons.CSSTransitionGroup, {
            transitionName: 'component',
            transitionAppear: true,
            transitionLeave: true,
            transitionEnter: true
        }, mentionNodes);
        return React.DOM.div({
            className: 'mentionscontent clear ui-mention-list'
        }, header, animationElement);
    }
});
