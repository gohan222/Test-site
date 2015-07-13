'use strict';

var $ = require('jquery');

module.exports = {
	getSearch : function(searchTerms, callback){
		$.get('search?confidence=12&includeSnippet=true&limit=25&offset=0&q=' + searchTerms,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});
	},
	getRelatedTopics : function(searchTerms, callback){
		$.get('search/relatedTopics?q=' + searchTerms,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});
	},
	getRelatedCollections : function(searchTerms, callback){
		$.get('search/relatedCollections?q=' + searchTerms,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});
	},
	getSearchByProgramId : function(programIds, searchTerms, callback){
		$.get('search/program?q=' + searchTerms + '&programIds=' + programIds,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});
	},
	getMentions : function(callback){
		$.get('mention',function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});
	}
}

