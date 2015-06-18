var $ = require('jquery');

module.exports = {
	getSearch : function(searchTerms, callback){
		$.get('search?confidence=12&includeSnippet=true&limit=25&offset=0&q=' + searchTerms,function(data, status){
			if(callback){
				callback.apply(this,[data]);
			}
		});
	}
}

