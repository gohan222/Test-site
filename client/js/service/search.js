'use strict';

var $ = require('jquery');

module.exports = {
    getSearch: function(searchTerms, callback, isSendProgress, callbackProgress) {
        //give arbitray display of progress
		var todayDate = new Date();
        var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        todayDate.setDate(todayDate.getDate() - 14);
        var startDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        $.ajax({
            type: 'GET', // 'POST' here so that _upload_ progress _also_ makes sense; 
            // Change to 'GET' if you need. 
            url: 'search?confidence=12&includeSnippet=true&limit=25&offset=0&q=' + searchTerms + '&startDate=' + startDate + '&endDate=' + endDate,
            data: {},
            success: function(data) {
                if (callback) {
                    callback.apply(this, [data]);
                }
            },
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.addEventListener('progress', function(evt) {
                	/*console.log('progress');
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        if(isSendProgress){
                        	if (callbackProgress) {
                        		callbackProgress.apply(this,[percentComplete]);
                        	}
                        	
                        }
                    }*/
                }, false);
                xhr.addEventListener('readystatechange', function(evt) {
                	var percentComplete = 0; 

                	if(isSendProgress){
                		switch(this.readyState){
                			case 1:
                				percentComplete = .25;
                				break;
                			case 2:
                				percentComplete = .50;
                				break;
                			case 3:
                				percentComplete = .75;
                				break;
                			case 4:
                				percentComplete = 1;
                				break;
                			default:
                				percentComplete = 0;
                				break;
                		}

                    	if (callbackProgress) {
                    		callbackProgress.apply(this,[percentComplete]);
                    	}
                    	
                    }
                }, false);

                
                return xhr;
            },
        });
    },
    getRelatedTopics: function(searchTerms, callback) {
        $.get('search/relatedTopics?q=' + searchTerms, function(data, status) {
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    getRelatedCollections: function(searchTerms, callback) {
        $.get('search/relatedCollections?q=' + searchTerms, function(data, status) {
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    getSearchByProgramId: function(programIds, searchTerms, callback, isSendProgress, callbackProgress) {
        var todayDate = new Date();
        var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        todayDate.setDate(todayDate.getDate() - 14);
        var startDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
		$.ajax({
            type: 'GET', // 'POST' here so that _upload_ progress _also_ makes sense; 
            // Change to 'GET' if you need. 
            url: 'search/program?q=' + searchTerms + '&programIds=' + programIds + '&startDate=' + startDate + '&endDate=' + endDate,
            data: {},
            success: function(data) {
                if (callback) {
                    callback.apply(this, [data]);
                }
            },
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.addEventListener('progress', function(evt) {
                	/*console.log('progress');
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        if(isSendProgress){
                        	if (callbackProgress) {
                        		callbackProgress.apply(this,[percentComplete]);
                        	}
                        	
                        }
                    }*/
                }, false);
                xhr.addEventListener('readystatechange', function(evt) {
                	var percentComplete = 0; 

                	if(isSendProgress){
                		switch(this.readyState){
                			case 1:
                				percentComplete = .25;
                				break;
                			case 2:
                				percentComplete = .50;
                				break;
                			case 3:
                				percentComplete = .75;
                				break;
                			case 4:
                				percentComplete = 1;
                				break;
                			default:
                				percentComplete = 0;
                				break;
                		}

                    	if (callbackProgress) {
                    		callbackProgress.apply(this,[percentComplete]);
                    	}
                    	
                    }
                }, false);

                
                return xhr;
            },
        });
    },
    getMentions: function(callback) {
        $.get('mention', function(data, status) {
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    getTranscript:function(id,startTime, endTime, callback){
        $.get('search/transcript/' + id + '?start=' + startTime + '&end=' + endTime,function(data, status){
            if(callback){
                callback.apply(this,[data]);
            }
        });
    },
    searchTopTrends:function(searchTerm, days, callback){

    }
}
