'use strict';

var $ = require('jquery');

module.exports = {
	getTopTrends:function(days,callback){
		$.get('analytics/topTrends?days='+ days,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});	
	},
	getTrends:function(searchTerms,days,callback){
		$.get('analytics/trends?q='+ searchTerms +'&days='+ days,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});	
	}
}

