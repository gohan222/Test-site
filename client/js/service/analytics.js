'use strict';

var $ = require('jquery');

module.exports = {
	getTopTrends:function(callback){
		$.get('analytics/topTrends?days=30',function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});	
	}
}

