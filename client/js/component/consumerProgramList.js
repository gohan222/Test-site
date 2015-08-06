'use strict';

var React = require('react'),
    // $ = require('jquery'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    LazyLoadImg = require('../component/image'),
    Player = require('../component/player'),
    ExpandedMention = require('../component/expandedMention'),
    TimeAgo = require('react-timeago'),
    Constants = require('../constant/appConstant'),
    Immutable = require('immutable'),
    ReactMotion = require('react-motion'),
    MD5 = require('md5'),
    Utils = require('../../../server/utils');

var Mention = React.createClass({
    mixins: [PureRenderMixin],
    onPlayClick: function(event) {
        if (AppStore.getIsScrolling()) {
            return;
        }

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
            isPlaying: false,

        };
    },
    onExpand: function() {
        this.props.onExpand(this.props.data);
    },
    render: function() {

        var airDate = React.DOM.i({
            className: 'program-mention-air-date'
        }, React.createElement(TimeAgo, {
            date: this.props.data.get('mediaStartTime')
        }));

        //program info
        var expandIcon = React.DOM.span({
                className: 'fa-stack program-card-play-icon icon-prop icon-prop-animation program-fa-stacked-play-icon clickable',
                onClick: this.onExpand
            },
            React.DOM.i({
                className: 'fa fa-circle fa-stack-2x'
            }),
            React.DOM.i({
                className: 'fa fa-expand fa-stack-1x fa-inverse'
            }));

        var frontCard,
            backCard,
            mediaType;

        if (this.props.data.get('mediaSourceTypeId') === 2) {
            mediaType = React.DOM.i({
                className: 'fa fa-video-camera program-card-icon'
            });
        } else if (this.props.data.get('mediaSourceTypeId') === 3) {
            mediaType = React.DOM.i({
                className: 'fa fa-youtube-play program-card-icon'
            });
        } else if (this.props.data.get('mediaSourceTypeId') === 4) {
            mediaType = React.DOM.i({
                className: 'fa fa-rss program-card-icon'
            });
        } else {
            mediaType = React.DOM.i({
                className: 'fa fa-microphone program-card-icon'
            });
        }

        if (this.state.isPlaying) {
            var mentionContainer = React.DOM.div({
                className: 'program-list-mention-player'
            }, React.createElement(Player, {
                src: Utils.mediaUrl(this.props.data),
                poster: this.props.data.get('programLiveImage'),
                fileType: this.props.data.get('fileType'),
                autoPlay:false
            }));

            var iconContainer = React.DOM.div({
                    className: 'program-card-icon-container program-card-icon-animation'
                },
                expandIcon)

            var footer = React.DOM.div(null,
                airDate,
                mediaType,
                iconContainer);

            backCard = React.DOM.div({
                className: 'program-card-back back'
            }, mentionContainer, footer);
        } else {
            backCard = React.DOM.span();
        }

        var footer = React.DOM.div(null,
                airDate,
                mediaType);

        //add mention snippet
        var mentionContainer = React.DOM.p({
            className: 'program-list-mention-text'
        }, React.DOM.span({
            className: 'cur-point ui-snip-text'
        }, Utils.getSnippetText(this.props.data.get('mentionSnippet'))));

        frontCard = React.DOM.div({
            className: 'program-card-front front',
            style:{display: this.props.visible ? 'block': 'none'}
        }, mentionContainer, footer);

        var holder = React.DOM.div({
            className: this.state.isPlaying ? 'flip-container-hover' : 'flip-container',
            onMouseEnter: this.onPlayClick,
            onMouseLeave: this.onCloseClick
        }, React.DOM.div({
            className: 'program-card program-card-animation clickable flipper'
        }, frontCard, backCard));


        return holder;
    }
});

var ProgramRow = React.createClass({
    mixins: [PureRenderMixin],
    scrollIndex: 0,
    onScrollLeft: function(event) {
        var cardWidth = 321;
        var parentContainer = this.refs.mentionList.getDOMNode().parentNode;
        var parentWidth = parentContainer.offsetWidth;
        var curPos = (cardWidth * this.scrollIndex);
        var viewableCards = Math.floor(parentWidth / cardWidth);

        if (viewableCards >= this.state.data.size) {
            return;
        } else if (this.scrollIndex - viewableCards < 0) {
            this.scrollIndex = 0;
        } else {
            this.scrollIndex -= viewableCards - 1;
        }

        this.scrollIndex--;
        if (this.scrollIndex < 0) {
            this.scrollIndex = 0;
        }

        this.setState({
            cardIndex: this.scrollIndex,
            scrollPosition: this.refs.mentionList.getDOMNode().style.left = -1 * (cardWidth * this.scrollIndex)
        });
    },
    onScrollRight: function(event) {

        var cardWidth = 321;
        var parentContainer = this.refs.mentionList.getDOMNode().parentNode;
        var parentWidth = parentContainer.offsetWidth;
        var curPos = (cardWidth * this.scrollIndex);
        var viewableCards = Math.floor(parentWidth / cardWidth);

        // this.scrollIndex++;
        if (viewableCards >= this.state.data.size) {
            return;
        } else if (viewableCards + this.scrollIndex >= this.state.data.size) {
            this.scrollIndex = this.state.data.size - viewableCards;
        } else {
            this.scrollIndex += viewableCards - 1;
        }

        this.setState({
            cardIndex: this.scrollIndex,
            scrollPosition: this.refs.mentionList.getDOMNode().style.left = -1 * (cardWidth * this.scrollIndex)
        });
    },
    getInitialState: function() {
        return {
            data: this.props.data,
            isExpanding: false,
            scrollPosition: 0,
            expandMention: null,
            visibleSize: -1,
            cardIndex: -1
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
    onProgramSearchResult: function() {
        var programSearchResult = AppStore.getProgramsSearch();

        var currentMention = this.state.data.get(0);
        var newMention = programSearchResult.get(0);
        if (currentMention.get('programId') === newMention.get('programId')) {
            this.setState({
                data: newMention.get('records')
            });
        }
    },
    calcViewableSize: function(){
        //measure what's the viewable size.
        var cardWidth = 321;
        var parentContainer = this.refs.mentionList.getDOMNode().parentNode;
        var parentWidth = parentContainer.offsetWidth;
        var curPos = (cardWidth * this.scrollIndex);
        var viewableCards = Math.ceil(parentWidth / cardWidth);
        return viewableCards;
    },
    onResize: function(){
        this.setState({visibleSize: this.calcViewableSize()});
    },
    componentDidMount: function() {
        AppStore.addChangeProgramSearchListener(this.onProgramSearchResult);
        window.addEventListener('resize', this.onResize);

        var mention = this.state.data.get(0);
        AppAction.getSearchByProgramId(mention.get('programId'), AppStore.getSearchTerms());

        this.setState({visibleSize: this.calcViewableSize(), cardIndex:0});

    },
    componentWillUnmount: function() {
        AppStore.removeChangeProgramSearchListener(this.onProgramSearchResult);
        window.removeEventListener('resize', this.onResize);
    },
    render: function() {
        var context = this;
        if (!this.state.data || this.state.data.size === 0) {
            return React.DOM.span();
        }

        var mentionNodes = this.state.data.map(function(mention, index) {
            return React.DOM.div({
                key: MD5(Utils.generateMentionKey(mention)),
                className: 'program-card-container'
            }, React.createElement(Mention, {
                data: mention,
                visible: this.state.visibleSize >= 0 && this.state.cardIndex >= 0 ? index >= this.state.cardIndex - 1  && index <= this.state.visibleSize + this.state.cardIndex : true,
                onExpand: this.onExpand,
            }), React.DOM.div({
                className: 'program-card-spacer'
            }));
        }, this);

        //referenced mention
        var refmention = this.state.data.get(0);

        //program info
        var programInfo = React.DOM.div();
        var backgroundImage = React.DOM.div({
                className: 'prog-avtr2'
            },
            React.createElement(LazyLoadImg, {
                src: refmention.get('programLiveImage'),
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
        }, React.DOM.a(null, refmention.get('programName')));
        var programNameContainer = React.DOM.div({
            className: 'prog-title2'
        }, programName);

        var programContainer = React.DOM.div({
            className: 'program-container'
        }, backgroundImage, programNameContainer);

        var motionMentions = React.createElement(ReactMotion.Spring, {
            endValue: {
                left: {
                    val: this.state.scrollPosition,
                    config: [200, 50]
                },
                opacity: {
                    val: this.state.isExpanding ? 0 : 1
                },
                isExpanding: this.state.isExpanding
            },
            ref: 'mentionList'
        }, function(props) {
            var style = {
                left: props.left.val,
                opacity: props.opacity.val
            };

            return React.createElement(React.addons.CSSTransitionGroup, {
                style: style,
                transitionName: 'component',
                transitionAppear: true,
                transitionLeave: true,
                transitionEnter: true
            }, mentionNodes);
        });

        var motionDetailed = React.createElement(ReactMotion.Spring, {
            key: MD5(Utils.generateMentionKey(this.state.expandMention)),
            endValue: {
                opacity: {
                    val: this.state.isExpanding ? 1 : 0
                }
            }
        }, function(props, props2) {
            var style = {
                opacity: props.opacity.val,
            }

            if (props.opacity.val === 0) {
                style.display = 'none';
            } else {
                style.display = 'inline-block';
            }

            return React.createElement(ExpandedMention, {
                className: 'program-expand-mention',
                style: style,
                data: context.state.expandMention,
                onClose: context.onCloseExpand
            });

        });

        var motionRowContainer = React.createElement(ReactMotion.Spring, {
            endValue: {
                height: {
                    val: this.state.isExpanding ? 354 : 219
                },
                isExpanding: this.state.isExpanding
            }
        }, function(props) {
            return React.DOM.li({
                className: props.isExpanding ? 'program-list-row-active background-color-animation' : 'program-list-row background-color-animation',
                style: {
                    height: props.height.val
                }
            }, programContainer, React.DOM.div({
                className: 'program-list-mention-container'
            }, motionMentions, motionDetailed), leftArrow, rightArrow);

        });

        var container = motionRowContainer;

        return container;
    }
});

module.exports = React.createClass({
    mixins: [PureRenderMixin],
    sortedResult: null,
    sortData: function(mentions) {
        var hash = {};
        var collection = Immutable.List.of();

        if (!mentions) {
            return collection;
        }

        for (var i = 0; i < mentions.size; i++) {
            var mention = mentions.get(i);
            if (!hash[mention.get('programId')]) {
                hash[mention.get('programId')] = Immutable.List.of(mention);
                collection = collection.push(hash[mention.get('programId')]);
            } else {
                hash[mention.get('programId')] = hash[mention.get('programId')].push(mention);
            }
        };

        return collection;
    },

    onChange: function() {
        //first we remove the data before adding new list to animation the draw.
        this.sortedResult = this.sortData(AppStore.getSearchResults());
        this.setState({
            data: this.sortedResult
        });
    },
    onSearchTermChange: function() {
        AppAction.searchInit(AppStore.getSearchTerms());
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this.onChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
        // AppStore.removeChangeProgramSearchListener(this.onProgramSearchResult);
    },
    getInitialState: function() {
        this.sortedResult = this.sortData(AppStore.getSearchResults());

        return {
            data: this.sortedResult,
            searchTerms: AppStore.getSearchTerms()
        };
    },
    render: function() {
        var programNodes = this.state.data.map(function(mentions) {
            return React.createElement(ProgramRow, {
                key: mentions.get(0).get('programId'),
                data: mentions
            });
        });

        var animationElement = React.createElement(React.addons.CSSTransitionGroup, {
            transitionName: 'component',
            transitionAppear: true,
            transitionLeave: true,
            transitionEnter: true
        }, programNodes);

        return React.DOM.ul({
            className: 'program-list-result'
        }, animationElement);
    }
});
