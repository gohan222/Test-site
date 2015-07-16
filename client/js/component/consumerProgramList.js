'use strict';

var React = require('react'),
    $ = require('jquery'),
    AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    LazyLoadImg = require('../component/image'),
    Player = require('../component/player'),
    ExpandedMention = require('../component/expandedMention'),
    TimeAgo = require('react-timeago'),
    Constants = require('../constant/appConstant'),
    Utils = require('../../../server/utils');

var Mention = React.createClass({
    getSnippetText: function(snippets) {
        var text = '';
        if (!snippets) {
            return text;
        }

        for (var i = 0; i < snippets.length; i++) {
            text += snippets[i].text;
        };

        return text;
    },
    onPlayClick: function(event) {
        this.setState({
            isPlaying: true
        });
    },
    onCloseClick: function(event) {
        this.setState({
            isPlaying: false
        });
    },
    getInitialState: function() {
        return {
            isPlaying: false
        };
    },
    render: function() {

        var airDate = React.DOM.i({
            className: 'program-mention-air-date'
        }, React.createElement(TimeAgo, {
            date: this.props.data.mediaStartTime
        }));

        //program info
        var expandIcon = React.DOM.span({
                className: 'fa-stack program-card-play-icon icon-prop icon-prop-animation program-fa-stacked-play-icon clickable',
                onClick: this.props.onExpand.bind(null, this.props.data)
            },
            React.DOM.i({
                className: 'fa fa-circle fa-stack-2x'
            }),
            React.DOM.i({
                className: 'fa fa-expand fa-stack-1x fa-inverse'
            }));
        /*var expandIcon = React.DOM.i({
            className: 'fa fa-plus-circle program-card-play-icon icon-prop icon-prop-animation clickable',
            onClick: this.props.onExpand.bind(null,this.props.data)
        });*/



        var playIcon, mentionContainer;
        if (this.state.isPlaying) {
            playIcon = React.DOM.i({
                className: 'fa fa-times-circle program-card-play-icon icon-prop icon-prop-animation clickable',
                onClick: this.onCloseClick
            });
            mentionContainer = React.DOM.div({
                className: 'program-list-mention-player'
            }, React.createElement(Player, {
                src: Utils.mediaUrl(this.props.data),
                poster: this.props.data.programLiveImage,
                fileType: this.props.data.fileType
            }));
        } else {
            playIcon = React.DOM.i({
                className: 'fa fa-play-circle program-card-play-icon icon-prop icon-prop-animation clickable',
                onClick: this.onPlayClick
            });
            //add mention snippet
            mentionContainer = React.DOM.p({
                className: 'program-list-mention-text'
            }, React.DOM.span({
                className: 'cur-point ui-snip-text'
            }, this.getSnippetText(this.props.data.mentionSnippet)));
        }

        var animateMentionContainer = React.createElement(React.addons.CSSTransitionGroup, {
            transitionName: 'component',
            transitionAppear: true,
            transitionLeave: true,
            transitionEnter: true,
        }, mentionContainer);

        var iconContainer = React.DOM.div({
                className: 'program-card-icon-container program-card-icon-animation'
            },
            expandIcon, playIcon)


        //media type
        var mediaType;

        if (this.props.data.mediaSourceTypeId === 2) {
            mediaType = React.DOM.i({
                className: 'fa fa-video-camera program-card-icon'
            });
        } else if (this.props.data.mediaSourceTypeId === 3) {
            mediaType = React.DOM.i({
                className: 'fa fa-youtube-play program-card-icon'
            });
        } else if (this.props.data.mediaSourceTypeId === 4) {
            mediaType = React.DOM.i({
                className: 'fa fa-rss program-card-icon'
            });
        } else {
            mediaType = React.DOM.i({
                className: 'fa fa-microphone program-card-icon'
            });
        }

        var footer = React.DOM.div(null,
            airDate,
            mediaType,
            iconContainer);

        var holder = React.DOM.div({
            className: 'program-card program-card-animation clickable'
        }, animateMentionContainer, footer);


        return holder;
    }
});

var ProgramRow = React.createClass({
    scrollIndex: 0,
    onScrollLeft: function(event) {
        // console.log(event);
        this.scrollIndex--;
        if (this.scrollIndex < 0) {
            this.scrollIndex = 0;
        }
        this.refs.mentionList.getDOMNode().style.left = -1 * (321 * this.scrollIndex) + 'px';
        // $(this.refs.mentionList.getDOMNode()).animate({left: -1*(321*this.scrollIndex)}, 300);
    },
    onScrollRight: function(event) {
        // console.log(event);
        this.scrollIndex++;
        if (this.scrollIndex > this.props.data.length) {
            this.scrollIndex = this.props.data.length;
        }

        this.refs.mentionList.getDOMNode().style.left = -1 * (321 * this.scrollIndex) + 'px';
        // $(this.refs.mentionList.getDOMNode()).animate({left: -1*(321*this.scrollIndex)}, 300);
    },
    getInitialState: function() {
        return {
            isExpanding: false
        };
    },
    onExpand: function(mention) {
        this.setState({
            isExpanding: true,
            expandMention: mention
        });
    },
    onCloseExpand: function() {
        this.setState({
            isExpanding: false,
            expandMention: null
        });
    },
    render: function() {
        var mentionNodes = this.props.data.map(function(mention) {
            return React.DOM.div({
                className: 'program-card-container'
            }, React.createElement(Mention, {
                data: mention,
                onExpand: this.onExpand,
            }), React.DOM.div({
                className: 'program-card-spacer'
            }));
        }, this);

        //referenced mention
        var refmention = this.props.data[0];

        //program info
        var programInfo = React.DOM.div();
        var backgroundImage = React.DOM.div({
                className: 'prog-avtr2'
            },
            React.createElement(LazyLoadImg, {
                src: refmention.programLiveImage,
                className: 'prog-avtr-style'
            }));

        //add porgram name
        var leftArrow = React.DOM.div({
            className: 'prog-left-arrow animation-1 clickable',
            onClick: this.onScrollLeft
        }, React.DOM.div({
            className: 'prog-arrow-background'
        }), React.DOM.i({
            className: 'fa fa-chevron-left'
        }));
        var rightArrow = React.DOM.div({
            className: 'prog-right-arrow animation-1 clickable',
            onClick: this.onScrollRight
        }, React.DOM.div({
            className: 'prog-arrow-background'
        }), React.DOM.i({
            className: 'fa fa-chevron-right'
        }));
        var programName = React.DOM.div({
            className: 'm5 bold'
        }, React.DOM.a(null, refmention.programName));
        var programNameContainer = React.DOM.div({
            className: 'prog-title2'
        }, programName);

        var programContainer = React.DOM.div({
            className: 'program-container'
        }, backgroundImage, programNameContainer)

        var animationElement = React.createElement(React.addons.CSSTransitionGroup, {
            className: 'scroll-animation',
            style: !this.state.isExpanding ? {
                left: 0,
                display: 'inline-block'
            } : {
                left: 0,
                display: 'none'
            },
            transitionName: 'component',
            transitionAppear: true,
            transitionLeave: true,
            transitionEnter: true,
            ref: 'mentionList',
            hidden: this.state.isExpanding
        }, mentionNodes);

        var expandedMention = React.createElement(ExpandedMention, {
            style: this.state.isExpanding ? {
                display: 'inline-block'
            } : {
                display: 'none'
            },
            data: this.state.expandMention,
            onClose: this.onCloseExpand
        });

        var container = React.DOM.li({
            className: this.state.isExpanding ? 'program-list-row-active' : 'program-list-row background-color-animation'
        }, programContainer, React.DOM.div({
            className: 'program-list-mention-container'
        }, animationElement, expandedMention), leftArrow, rightArrow);

        return container;
    }
});

module.exports = React.createClass({
    sortedResult: null,
    sortData: function(mentions) {
        var hash = {};
        var collection = [];

        if (!mentions) {
            return collection;
        }

        for (var i = 0; i < mentions.length; i++) {
            var mention = mentions[i];
            if (!hash[mention.programId]) {
                hash[mention.programId] = [mention];
                collection.push(hash[mention.programId]);
            } else {
                hash[mention.programId].push(mention);
            }
        };

        return collection;
    },
    getProgramSearches: function(sortedMention) {
        var programIds = '';
        for (var i = 0; i < sortedMention.length; i++) {
            var mention = sortedMention[i][0];
            if (!programIds) {
                programIds = mention.programId;
            } else {
                programIds += ',' + mention.programId;
            }
        };

        AppAction.getSearchByProgramId(programIds, AppStore.getSearchTerms());
    },
    onChange: function() {
        //first we remove the data before adding new list to animation the draw.
        this.sortedResult = this.sortData(AppStore.getSearchResults());
        this.setState({
            data: this.sortedResult
        });
        this.getProgramSearches(this.sortedResult);
        // AppAction.sendProgress(0);
    },
    onSearchTermChange: function() {
        this.setState({
            data: []
        });
        AppAction.searchInit(AppStore.getSearchTerms());
    },
    onProgramSearchResult: function() {
        var programSearchResult = AppStore.getProgramsSearch();
        var context = this;
        // this.sortedResult = this.sortData(programSearchResult);
        if (!programSearchResult || programSearchResult.length === 0) {
            return;
        }

        // var mention = programSearchResult[0],
        // mentionsList = null;
        for (var i = 0; i < programSearchResult.length; i++) {
            var psr = programSearchResult[i];
            for (var i = 0; i < this.sortedResult.length; i++) {
                if (this.sortedResult[i][0].programId === psr.programId) {
                    this.sortedResult[i] = psr.records;
                    break;
                }
            };
        };


        setTimeout(function() {
            context.setState({
                data: context.sortedResult
            });
        }, 500);

        // AppAction.sendProgress(0);
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this.onChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
        AppStore.addChangeProgramSearchListener(this.onProgramSearchResult);

        if (this.state.searchTerms) {
            AppAction.searchInit(this.state.searchTerms);
        }
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
        AppStore.removeChangeProgramSearchListener(this.onProgramSearchResult);
    },
    getInitialState: function() {
        this.sortedResult = this.sortData(AppStore.getSearchResults());
        //this.getProgramSearches(this.sortedResult);
        return {
            data: this.sortedResult,
            searchTerms: AppStore.getSearchTerms()
        };
    },
    render: function() {
        var programNodes = this.state.data.map(function(mentions) {
            return React.createElement(ProgramRow, {
                data: mentions
            });
        });

        return React.DOM.ul({
            className: 'program-list-result'
        }, programNodes);
    }
});
