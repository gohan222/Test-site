var React = require('react'),
    Utils = require('../utils'),
    Search = require('../../client/js/component/search'),
    config = require('../config'),
    AppAction = require('../../client/js/action/appAction'),
    AppStore = require('../../client/js/store/appStore'),
    Constants = require('../../client/js/constant/appConstant'),
    ReactRouter = require('react-router'),
    ConsumerRoutes = require('../../client/js/router/consumer'),
    Header = require('../../client/js/component/consumerHeader');

module.exports = {
    pageTemplate: function(app, options){
        var html = React.renderToStaticMarkup(React.DOM.html(null, React.DOM.head(null, React.DOM.link({
            href: '/dist/consumer.' + options.hash + '.css',
            rel: 'stylesheet'
        })), React.DOM.body(null,
            React.DOM.div({
                    id: 'app'
                },
                React.createElement(app)
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
                    __html: 'var SOCKET = io.connect(\'' + config.socketDomain + '\');'
                }
            })
        )))

        return html;
    },
    render: function(options, callback) {
        var context = this;

        ReactRouter.run(ConsumerRoutes, options.path, function(root) {
            var markup = context.pageTemplate(root, options);
            callback.apply(this,[markup]);
        });
    }
};
