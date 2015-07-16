'use strict';

var React = require('react'),
    Player = require('../component/player'),
    TimeAgo = require('react-timeago'),
    AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    Utils = require('../../../server/utils');

module.exports = React.createClass({
    getSnippetText: function(snippets) {
        var text = '';
        if (!snippets || !snippets.textFragments) {
            return text;
        }

        for (var i = 0; i < snippets.textFragments.length; i++) {
            text += snippets.textFragments[i].text;
        };

        return text;
    },
    onChangeTranscript: function() {
        if(this.props.data && AppStore.getTranscriptId() === this.props.data.mediaId){
            this.setState({transcript: this.getSnippetText(AppStore.getTranscript())});
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
      if(nextProps.data && this.props.data != nextProps.data){
        AppAction.getTranscript(nextProps.data.mediaId, nextProps.data.mentionSnippet[0].startTime, nextProps.data.mentionSnippet[nextProps.data.mentionSnippet.length-1].endTime);
      }
    },
    getInitialState:function(){
        return {};
    },
    render: function() {
        if (!this.props.data) {
            return React.DOM.div();
        }

        var player = React.createElement(Player, {
            src: Utils.mediaUrl(this.props.data),
            poster: this.props.data.programLiveImage,
            fileType: this.props.data.fileType
        });

        var socialContainer = React.DOM.div({
                className: 'program-expand-social-container'
            },
            React.DOM.i({
                className: 'program-mention-air-date'
            }, React.createElement(TimeAgo, {
                date: this.props.data.mediaStartTime
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

        var expandTranscript = React.DOM.div({className: 'program-expanded-right'}, 
            React.DOM.p(null, this.state.transcript ? this.state.transcript : ''));
        var expandMedia = React.DOM.div({
            className: 'program-expanded-left'
        }, React.DOM.div({
            className: 'program-expand-media-container'
        }, player, socialContainer));

        var closeIcon = React.DOM.i({
            className: 'fa fa-times-circle program-card-close-expand-icon icon-prop icon-prop-animation clickable',
            onClick: this.props.onClose.bind(null)
        });


        return React.DOM.div({
            className: 'program-expand-mention',
            hidden: this.props.hidden
        }, expandMedia, expandTranscript, closeIcon);
    }
});
