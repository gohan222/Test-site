'use strict';

var BroadcasterHeader = require('../component/header'),
ConsumerHeader = require('../component/consumerHeader'),
AppConstant = require('../constant/appConstant'),
React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {app: this.props.app}
  	},
	render: function() {
	  	var header;

	    if(this.state.app === AppConstant.APP_BROADCASTER){
	    	header = React.createElement(BroadcasterHeader);
	    }else{
	    	header = React.createElement(ConsumerHeader);
	    }
	    
	    return header;
	}
});