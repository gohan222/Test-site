'use strict';

var BroadcasterHeader = require('../component/header'),
ConsumerHeader = require('../component/consumerHeader'),
AppConstant = require('../constant/appConstant'),
React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
    	return {app: this.props.app, user:this.props.user};
  	},
	render: function() {
		console.log('master');
		console.log(this.state.user);
	  	var header;

	    if(this.state.app === AppConstant.APP_BROADCASTER){
	    	header = React.createElement(BroadcasterHeader, {user:this.state.user});
	    }else{
	    	header = React.createElement(ConsumerHeader, {user:this.state.user});
	    }
	    
	    return header;
	}
});