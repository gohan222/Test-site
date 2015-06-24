var React = require('react'),
Hamburger = require('../../client/js/component/hamburger'),
Header = require('../../client/js/component/header'),
ConsumerHeader = require('../../client/js/component/consumerHeader');

module.exports = {
	generateHeader: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Header)));
	},
	generateHamburger: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Hamburger)));
	},
	generateConsumerHeader: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(ConsumerHeader)));
	},
};