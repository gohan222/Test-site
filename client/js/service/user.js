'use strict';

var $ = require('jquery');

module.exports = {
	login:function(username,password,callback){
		$.post('user/login',{username: username, password:password},function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});	
	}
}

