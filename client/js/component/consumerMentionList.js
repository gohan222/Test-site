'use strict';

var AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    LazyLoadImg = require('../component/image'),
    Utils = require('../../../server/utils'),
    MD5 = require('md5'),
    React = require('react/addons');

var Mention = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {

        //add background image
        // var backgroundStyle = {backgroundImage:'url(' + this.props.data.programLiveImage + ')',
        //                        backgroundSize: 'cover' }
        var backgroundImage = React.DOM.div({
                className: 'prog-avtr'
            },
            React.createElement(LazyLoadImg, {
                src: this.props.data.get('programLiveImage'),
                className: 'prog-avtr-style'
            }));

        //add porgram name
        var arrowIcon = React.DOM.a({
            className: 'blue-play'
        });
        var programName = React.DOM.div({
            className: 'm5 bold'
        }, React.DOM.a(null, this.props.data.get('programName')));
        var airDate = React.DOM.i({
            className: 'mention-air-date'
        }, 'Air date: ' + this.props.data.get('mediaStartTime'));
    var programNameContainer = React.DOM.div({
        className: 'prog-title'
    }, arrowIcon, programName, airDate);

    //add mention snippet
    var mentionSnippet = React.DOM.p({
        className: 'mention-snippet-text'
    }, React.DOM.span({
        className: 'cur-point ui-snip-text'
    }, Utils.getSnippetText(this.props.data.get('mentionSnippet'))));

    var holder = React.DOM.div({
        className: 'ui-au-holder'
    }, backgroundImage, programNameContainer, mentionSnippet);
    var container = React.DOM.li({
        className: 'ui-search-item'
    }, holder);

    return container;
}
});

module.exports = React.createClass({
    mixins: [PureRenderMixin],
    onChange: function() {
        //first we remove the data before adding new list to animate the draw.
        this.setState({
            data: AppStore.getSearchResults()
        });
    },
    onSearchTermChange: function() {
        AppAction.searchInit(AppStore.getSearchTerms());
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this.onChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);

        if (this.state.searchTerms) {
            AppAction.searchInit(this.state.searchTerms);
        }

    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    },
    getInitialState: function() {
        return {
            data: AppStore.getSearchResults(),
            searchTerms: AppStore.getSearchTerms()
        };
    },
    render: function() {
        if (!this.state.data) {
            return React.DOM.ul({
                className: 'results'
            }, null);
        }

        var mentionNodes = this.state.data.map(function(mention) {
            return React.createElement(Mention, {
                key: MD5(Utils.generateMentionKey(mention)),
                data: mention
            });
        });

        var animationElement = React.createElement(React.addons.CSSTransitionGroup, {
            transitionName: 'component',
            transitionAppear: true,
            transitionLeave: true,
            transitionEnter: true
        }, mentionNodes);
        return React.DOM.ul({
            className: 'results'
        }, animationElement);
    }
});
