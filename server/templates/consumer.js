var React = require('react'),
    Utils = require('../utils'),
    Search = require('../../client/js/component/search'),
    Header = require('../../client/js/component/consumerHeader');

module.exports = {
    render: function(options) {
        var html = React.renderToStaticMarkup(React.DOM.html(null, React.DOM.head(null, React.DOM.link({
            href: 'dist/consumer.' + options.hash + '.css',
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
                }, React.createElement(Search))
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
                src: 'dist/consumer.' + options.hash + '.js',
                type: 'text/javascript'
            }),
            React.DOM.script({
                src: 'http://localhost:9090/socket.io/socket.io.js',
                type: 'text/javascript'
            }),
            React.DOM.script({
                dangerouslySetInnerHTML: {
                    __html: 'var socket = io.connect(\'http://localhost:9090\'); socket.on(\'news\', function (data) { console.log(data); setInterval(function(){socket.emit(\'my other event\', { my: \'data\' });},500);});'
                }
            })
        )))

        return html;
    }
};
