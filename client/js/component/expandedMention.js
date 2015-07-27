'use strict';

var React = require('react'),
    Player = require('../component/player'),
    TimeAgo = require('react-timeago'),
    AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Utils = require('../../../server/utils');

module.exports = React.createClass({
    mixins: [PureRenderMixin],
    getSnippetText: function(snippets) {
        var text = '';
        if (!snippets || !snippets.get('textFragments').size > 0) {
            return text;
        }
        var textFragments = snippets.get('textFragments');
        for (var i = 0; i < textFragments.size; i++) {
            text += textFragments.get(i).get('text');
        };

        return text;
    },
    onCloseExpand: function() {
        this.props.onClose();
    },
    onChangeTranscript: function() {
        if (this.props.data && AppStore.getTranscriptId() === this.props.data.get('mediaId')) {
            this.setState({
                transcript: this.getSnippetText(AppStore.getTranscript())
            });
        }
    },
    componentDidMount: function() {
        AppStore.addChangeTranscriptListener(this.onChangeTranscript);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeTranscriptListener(this.onChangeTranscript);
    },
    componentWillReceiveProps: function(nextProps) {
        // console.log('componentWillReceiveProps');  
        if (nextProps.data && this.props.data != nextProps.data) {
            AppAction.getTranscript(nextProps.data.get('mediaId'), nextProps.data.get('mentionSnippet').get(0).get('startTime'), nextProps.data.get('mentionSnippet').get(nextProps.data.get('mentionSnippet').size - 1).get('endTime'));
        }
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        if (!this.props.data) {
            return React.DOM.div();
        }

        var player = React.createElement(Player, {
            src: Utils.mediaUrl(this.props.data),
            poster: this.props.data.get('programLiveImage'),
            fileType: this.props.data.get('fileType')
        });

        var socialContainer = React.DOM.div({
                className: 'program-expand-social-container'
            },
            React.DOM.i({
                className: 'program-mention-air-date'
            }, React.createElement(TimeAgo, {
                date: this.props.data.get('mediaStartTime')
            })), React.DOM.i({
                className: 'fa fa-envelope-o program-card-play-icon icon-prop icon-prop-animation clickable'
            }),
            React.DOM.i({
                className: 'fa fa-twitter program-card-play-icon icon-prop icon-prop-animation clickable'
            }),
            React.DOM.i({
                className: 'fa fa-facebook program-card-play-icon icon-prop icon-prop-animation clickable'
            }),
            React.DOM.i({
                className: 'fa fa-link program-card-play-icon icon-prop icon-prop-animation clickable'
            }),
            React.DOM.i({
                className: 'fa fa-code program-card-play-icon icon-prop icon-prop-animation clickable'
            }));

        var expandTranscript = React.DOM.div({
                className: 'program-expanded-right'
            },
            React.DOM.p(null, this.state.transcript ? this.state.transcript : ''));
        var expandMedia = React.DOM.div({
            className: 'program-expanded-left'
        }, React.DOM.div({
            className: 'program-expand-media-container'
        }, player, socialContainer));

        var closeIcon = React.DOM.i({
            className: 'fa fa-times-circle program-card-close-expand-icon icon-prop icon-prop-animation clickable',
            onClick: this.onCloseExpand
        });


        return React.DOM.div({
            className: 'program-expand-mention opacity-animation',
            hidden: this.props.hidden
        }, expandMedia, expandTranscript, closeIcon);
    }
});
