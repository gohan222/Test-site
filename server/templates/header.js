var React = require('react'),
Hamburger = require('../../client/js/component/hamburger'),
AppConstant = require('../../client/js/constant/appConstant'),
Header = require('../../client/js/component/masterHeader');

module.exports = {
	generateHeader: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Header,{app:AppConstant.APP_BROADCASTER})));
	},
	generateHamburger: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Hamburger)));
	},
	generateConsumerHeader: function(chunk, context, bodies, params){
		return chunk.write(React.renderToStaticMarkup(React.createElement(Header,{app:AppConstant.APP_CONSUMER, user:context.get('user') })));
	},
};