var React = require('react'),
Header = require('../../client/js/component/header');

module.exports = {
	generateHeader: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Header)));
	},
};