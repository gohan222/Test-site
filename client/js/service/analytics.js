'use strict';

var $ = require('jquery');

module.exports = {
	getTopTrends:function(days,callback){
		$.get('analytics/topTrends?days='+ days,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});	
	}
}

