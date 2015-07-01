var React = require('react'),
Search = require('../../client/js/component/search');

module.exports = {
	generateSearchContent: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Search)));
	},
	generateInit: function(chunk, context, bodies, params){
		return {user:context.get('user')};
	}
};