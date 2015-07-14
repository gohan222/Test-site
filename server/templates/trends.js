var React = require('react'),
    Utils = require('../utils'),
    Trend = require('../../client/js/component/trend'),
    Header = require('../../client/js/component/header'),
    Hamburger = require('../../client/js/component/hamburger');

module.exports = {
    render: function(options) {
        var html = React.renderToStaticMarkup(React.DOM.html(null, React.DOM.head(null, React.DOM.link({
            href: 'dist/broadcaster.' + options.hash + '.css',
            rel: 'stylesheet'
        })), React.DOM.body(null,
            React.DOM.div({id:'app-hamburger', className:'hamburger-container'},
                React.createElement(Hamburger)),
            React.DOM.div({
                    className: 'content-container'
                },
                React.DOM.div({
                    id: 'app-header'
                },
                React.createElement(Header,{user:options.user})),
                React.DOM.div({
                    id: 'app-content'
                }, React.createElement(Trend))
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
                src: 'dist/broadcaster.' + options.hash + '.js',
                type: 'text/javascript'
            })
        )))

        return html;
    }
};
