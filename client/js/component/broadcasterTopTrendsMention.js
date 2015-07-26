'use strict';

var React = require('react'),
    $ = require('jquery'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    LazyLoadImg = require('../component/image'),
    Player = require('../component/player'),
    ExpandedMention = require('../component/expandedMention'),
    TimeAgo = require('react-timeago'),
    Constants = require('../constant/appConstant'),
    Immutable = require('immutable'),
    Utils = require('../../../server/utils');

var Mention = React.createClass({
    mixins: [PureRenderMixin],
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
    onExpand: function() {
        this.props.onExpand(this.props.data);
    },
    render: function() {

        var airDate = React.DOM.i({
            className: 'trend-mention-air-date'
        }, React.createElement(TimeAgo, {
            date: this.props.data.get('mediaStartTime')
        }));

        //program info
        var expandIcon = React.DOM.span({
                className: 'fa-stack trend-card-play-icon icon-prop icon-prop-animation trend-fa-stacked-play-icon clickable',
                onClick: this.onExpand
            },
            React.DOM.i({
                className: 'fa fa-circle fa-stack-2x'
            }),
            React.DOM.i({
                className: 'fa fa-expand fa-stack-1x fa-inverse'
            }));
        /*var expandIcon = React.DOM.i({
            className: 'fa fa-plus-circle trend-card-play-icon icon-prop icon-prop-animation clickable',
            onClick: this.props.onExpand.bind(null,this.props.data)
        });*/
        var backgroundImage = React.DOM.div({
                className: 'trend-avtr2'
            },
            React.createElement(LazyLoadImg, {
                src: this.props.data.get('programImage'),
                className: 'trend-avtr-style'
            }));
        var programName = React.DOM.div({
            className: 'm5 bold'
        }, React.DOM.a(null, this.props.data.get('programName')));
        var programNameContainer = React.DOM.div({
            className: 'trend-title2'
        }, programName);

        var programContainer = React.DOM.div({
            className: 'trend-container'
        }, backgroundImage, programNameContainer)


        var playIcon, mentionContainer;
        if (this.state.isPlaying) {
            playIcon = React.DOM.i({
                className: 'fa fa-times-circle trend-card-play-icon icon-prop icon-prop-animation clickable',
                onClick: this.onCloseClick
            });
            mentionContainer = React.DOM.div({
                className: 'trend-list-mention-player'
            }, React.createElement(Player, {
                src: Utils.mediaUrl(this.props.data),
                poster: this.props.data.get('programLiveImage'),
                fileType: this.props.data.get('fileType')
            }));
        } else {
            playIcon = React.DOM.i({
                className: 'fa fa-play-circle trend-card-play-icon icon-prop icon-prop-animation clickable',
                onClick: this.onPlayClick
            });
            //add mention snippet
            mentionContainer = React.DOM.p({
                className: 'trend-list-mention-text'
            }, React.DOM.span({
                className: 'cur-point ui-snip-text'
            }, Utils.getSnippetText(this.props.data.get('mentionSnippet'))));
        }

        var iconContainer = React.DOM.div({
                className: 'trend-card-icon-container trend-card-icon-animation'
            },
            expandIcon, playIcon)


        //media type
        var mediaType;

        if (this.props.data.get('mediaSourceTypeId') === 2) {
            mediaType = React.DOM.i({
                className: 'fa fa-video-camera trend-card-icon'
            });
        } else if (this.props.data.get('mediaSourceTypeId') === 3) {
            mediaType = React.DOM.i({
                className: 'fa fa-youtube-play trend-card-icon'
            });
        } else if (this.props.data.get('mediaSourceTypeId') === 4) {
            mediaType = React.DOM.i({
                className: 'fa fa-rss trend-card-icon'
            });
        } else {
            mediaType = React.DOM.i({
                className: 'fa fa-microphone trend-card-icon'
            });
        }

        var footer = React.DOM.div(null,
            airDate,
            mediaType,
            iconContainer);

        var holder = React.DOM.div({
            className: 'trend-card trend-card-animation clickable'
        },programContainer, mentionContainer, footer);


        return holder;
    }
});

var ProgramRow = React.createClass({
    mixins: [PureRenderMixin],
    scrollIndex: 0,
    onChangeFilterTopTrendMention:function(){
      this.setState({
            show: AppStore.getFilterTopTrendMention() === -1 || AppStore.getFilterTopTrendMention() === this.props.index
        });      
    },
    onChangeTopTrend:function(){
      var topTrendMention = AppStore.getTopTrendMention();
      var topTrend = this.state.data;
      if(this.state.data.get('searchTerm') === topTrendMention.get('searchTerm')){
        topTrend = topTrend.set('records', topTrendMention.get('records'));
        this.setState({data: topTrend});
      }
    },
    onScrollLeft: function(event) {
        var cardWidth = 280;
        var parentContainer = this.refs.mentionList.getDOMNode().parentNode;
        var parentWidth = parentContainer.offsetWidth;
        var curPos = (cardWidth * this.scrollIndex);
        var viewableCards = Math.floor(parentWidth/cardWidth);

        if(viewableCards >= this.props.data.length){
            return;
        }else if (this.scrollIndex - viewableCards < 0){
            this.scrollIndex = 0;
        }else{
            this.scrollIndex -= viewableCards - 1;
        }

        // console.log(event);
        this.scrollIndex--;
        if (this.scrollIndex < 0) {
            this.scrollIndex = 0;
        }
        this.refs.mentionList.getDOMNode().style.left = -1 * (cardWidth * this.scrollIndex) + 'px';
        // $(this.refs.mentionList.getDOMNode()).animate({left: -1*(cardWidth*this.scrollIndex)}, 400);
    },
    onScrollRight: function(event) {
        // console.log(event);
        var cardWidth = 280;
        var parentContainer = this.refs.mentionList.getDOMNode().parentNode;
        var parentWidth = parentContainer.offsetWidth;
        var curPos = (cardWidth * this.scrollIndex);
        var viewableCards = Math.floor(parentWidth/cardWidth);

        // this.scrollIndex++;
        if(viewableCards >= this.props.data.length){
            return;
        }else if(viewableCards + this.scrollIndex >= this.props.data.length){
            this.scrollIndex = this.props.data.length - viewableCards;
        }else{
            this.scrollIndex += viewableCards - 1;
        }

        this.refs.mentionList.getDOMNode().style.left = -1 * (cardWidth * this.scrollIndex) + 'px';
        // $(this.refs.mentionList.getDOMNode()).animate({left: -1*(cardWidth*this.scrollIndex)}, 400);
    },
    getInitialState: function() {
        return {
            data: this.props.data,
            index: this.props.index,
            show: AppStore.getFilterTopTrendMention() === -1 || AppStore.getFilterTopTrendMention() === this.props.index,
            isExpanding: false
        };
    },
    onExpand: function(mention) {
        var context = this;
        $(React.findDOMNode(this.refs.mentionList)).animate({
            opacity: 0
        }, 200, 'linear');

        $(this.getDOMNode()).animate({
                height: 354
            }, 200, 'linear',
            function() {
                context.setState({
                    isExpanding: true,
                    expandMention: mention
                });
            });
    },
    onCloseExpand: function() {
        var context = this
        $(React.findDOMNode(this.refs.mentionList)).animate({
            opacity: 1
        }, 200, 'linear');
        $(this.getDOMNode()).animate({
                height: 340
            }, 200, 'linear',
            function() {
                context.setState({
                    isExpanding: false,
                    expandMention: null
                });
            });

    },
    componentDidMount: function() {
        // AppStore.addChangeTopTrendsListener(this.onChange);
        AppStore.addChangeTopTrendMentionListener(this.onChangeTopTrend);
        AppStore.addChangeFilterTopTrendMentionListener(this.onChangeFilterTopTrendMention);

        //init the data
        AppAction.getTopTrendsMention(this.state.data.get('searchTerm'), AppStore.getFilter());
    },
    componentWillUnmount: function() {
        // AppStore.removeChangeTopTrendsListener(this.onChange);
        AppStore.removeChangeTopTrendMentionListener(this.onChangeTopTrend);
        AppStore.removeChangeFilterTopTrendMentionListener(this.onChangeFilterTopTrendMention);
    },
    render: function() {

        if(!this.state.data || !this.state.show){
          return React.DOM.span();
        }

        var mentionNodes = this.state.data.get('records').map(function(mention) {
            return React.DOM.div({
                className: 'trend-card-container'
            }, React.createElement(Mention, {
                data: mention,
                onExpand: this.onExpand,
            }), React.DOM.div({
                className: 'trend-card-spacer'
            }));
        }, this);

        //add porgram name
        var leftArrow = React.DOM.div({
            className: 'trend-left-arrow animation-1 clickable',
            onClick: this.onScrollLeft
        }, React.DOM.div({
            className: 'trend-arrow-background'
        }), React.DOM.i({
            className: 'fa fa-chevron-left'
        }));
        var rightArrow = React.DOM.div({
            className: 'trend-right-arrow animation-1 clickable',
            onClick: this.onScrollRight
        }, React.DOM.div({
            className: 'trend-arrow-background'
        }), React.DOM.i({
            className: 'fa fa-chevron-right'
        }));
        var programName = React.DOM.div({
            className: 'm5 bold'
        }, React.DOM.a(null, this.state.data.get('searchTerm')));
        var programNameContainer = React.DOM.div({
            className: 'trend-title3'
        }, programName);

        var programContainer = React.DOM.div({
            className: 'trend-container'
        }, programNameContainer)

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
            className: this.state.isExpanding ? 'trend-list-row-active background-color-animation' : 'trend-list-row background-color-animation'
        }, programContainer, React.DOM.div({
            className: 'trend-list-mention-container'
        }, animationElement, expandedMention), leftArrow, rightArrow);

        return container;
    }
});

module.exports = React.createClass({
    mixins: [PureRenderMixin],
    sortData: Immutable.List.of(),
    onChange: function() {
        var topTrends = AppStore.getTopTrends();
        var trendsList = [];
        this.sortData = Immutable.List.of();
        for (var i = 0; i < topTrends.size; i++) {
            trendsList.push(topTrends.get(i).get('term'));
            this.sortData = this.sortData.push( Immutable.fromJS({searchTerm: topTrends.get(i).get('term'), records:[]}));
        };

        this.setState({
            data: this.sortData
        });
    },
    /*onChangeTopTrend:function(){
      var topTrendMention = AppStore.getTopTrendMention();
      for (var i = 0; i < this.sortData.size; i++) {
        var topTrend = this.sortData.get(i);
        if(topTrend.get('searchTerm') === topTrendMention.get('searchTerm')){
          topTrend = topTrend.set('records', topTrendMention.get('records'));
          this.sortData = this.sortData.set(i, topTrend);
          break;
        }
      }

      var index = AppStore.getFilterTopTrendMention();

      this.setState({data: index >= 0 ? [this.sortData.get(index)] : this.sortData});
    },*/
    componentDidMount: function() {
        AppStore.addChangeTopTrendsListener(this.onChange);
        // AppStore.addChangeTopTrendMentionListener(this.onChangeTopTrend);
        // AppStore.addChangeFilterTopTrendMentionListener(this.onChangeFilterTopTrendMention);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeTopTrendsListener(this.onChange);
        // AppStore.removeChangeTopTrendMentionListener(this.onChangeTopTrend);
        // AppStore.removeChangeFilterTopTrendMentionListener(this.onChangeFilterTopTrendMention);
    },
    getInitialState:function(){
      return {data: []};
    },
    render: function() {
        var programNodes = this.state.data.map(function(mentions, index) {
            return React.createElement(ProgramRow, {
                data: mentions,
                index: index
            });
        });

        var animationElement = React.createElement(React.addons.CSSTransitionGroup, {
            transitionName: 'component',
            transitionAppear: true,
            transitionLeave: true,
            transitionEnter: true
        }, programNodes);

        return React.DOM.ul({
            className: 'trend-list-result'
        }, animationElement);
    }
});
