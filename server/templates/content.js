var React = require('react'),
Search = require('../../client/js/component/search'),
Trend = require('../../client/js/component/trend'),
Constant = require('../../client/js/constant/appConstant');

module.exports = {
	generateSearchContent: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Search)));
	},
	generateTrendContent: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Trend, {app: Constant.APP_BROADCASTER })));
	},
	generateInit: function(chunk, context, bodies, params){
		return {user:context.get('user')};
	}
};