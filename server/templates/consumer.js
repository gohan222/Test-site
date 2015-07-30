var React = require('react'),
    Utils = require('../utils'),
    Search = require('../../client/js/component/search'),
    config = require('../config'),
    AppAction = require('../../client/js/action/appAction'),
    AppStore = require('../../client/js/store/appStore'),
    Constants = require('../../client/js/constant/appConstant'),
    Header = require('../../client/js/component/consumerHeader');

module.exports = {
    render: function(options) {
        switch(options.view){
            case 'search':
                options.view = Constants.VIEW_MENTION_LIST;
                break;
            case 'program':
                options.view = Constants.VIEW_PROGRAM_LIST;
                break;
            default:
                break;
        }
        
        var html = React.renderToStaticMarkup(React.DOM.html(null, React.DOM.head(null, React.DOM.link({
            href: '/dist/consumer.' + options.hash + '.css',
            rel: 'stylesheet'
        })), React.DOM.body(null,
            React.DOM.div({
                    className: 'content-container'
                },
                React.DOM.div({
                        id: 'app-header'
                    },
                    React.createElement(Header, {
                        user: options.user
                    })),
                React.DOM.div({
                    id: 'app-content'
                }, React.createElement(Search,{view: options.view}))
            ),
            React.DOM.div({
                id: 'app-modal'
            }),
            React.DOM.script({
                dangerouslySetInnerHTML: {
                    __html: 'var APP = ' + Utils.safeStringify(options ? options : {}) + ';'
                }
            }),
            React.DOM.script({
                src: '/dist/consumer.' + options.hash + '.js',
                type: 'text/javascript'
            }),
            React.DOM.script({
                src: '/js/vendor/socket.io.js',
                type: 'text/javascript'
            }),
            React.DOM.script({
                dangerouslySetInnerHTML: {
                    __html: 'var SOCKET = io.connect(\'' + config.socketDomain +'\');'
                }
            })
        )))

        return html;
    }
};
