var React = require('react'),
    Utils = require('../utils'),
    Trend = require('../../client/js/component/trend'),
    Header = require('../../client/js/component/header'),
    config = require('../config'),
    ReactRouter = require('react-router'),
    BroadcasterRoutes = require('../../client/js/router/broadcaster'),
    Hamburger = require('../../client/js/component/hamburger');

module.exports = {
    pageTemplate: function(app, options){
        var html = React.renderToStaticMarkup(React.DOM.html(null, React.DOM.head(null, React.DOM.link({
            href: '/dist/broadcaster.' + options.hash + '.css',
            rel: 'stylesheet'
        })), React.DOM.body(null,
            React.DOM.div({id:'app-hamburger', className:'hamburger-container'},
                React.createElement(Hamburger)),
            React.DOM.div({
                    id: 'app'
                },
                React.createElement(app, {user:options.user})
            ),
            React.DOM.div({
                id: 'app-modal'
            }),
            React.DOM.script({
                dangerouslySetInnerHTML: {
                    __html: 'var APP = ' + Utils.safeStringify(options ? options : {} ) + ';'
                }
            }),
            React.DOM.script({
                src: '/dist/broadcaster.' + options.hash + '.js',
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
        )));

        return html;
    },
    render: function(options, callback) {
        var context = this;
        ReactRouter.run(BroadcasterRoutes, options.path, function(root) {
            var markup = context.pageTemplate(root, options);
            callback.apply(this,[markup]);
        });
    }
};
