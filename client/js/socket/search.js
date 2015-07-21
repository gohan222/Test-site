'use strict';

module.exports = {
    search: function(searchTerms, callback) {
    	console.log('request search: ' + searchTerms);
        SOCKET.emit('search', searchTerms, function(data) {
        	console.log('response search: ' + searchTerms);
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    searchByProgramId: function(programId, searchTerms, callback) {
        console.log('request searchByProgramId: ' + programId + ', ' + searchTerms);
        SOCKET.emit('searchByProgramId', {
            searchTerms: searchTerms,
            programId: programId
        }, function(data){
        	console.log('response searchByProgramId: ' + programId + ', ' + searchTerms);
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    searchTopTrends:function(searchTerm, days, callback){
    	console.log('request searchTopTrends: ' + searchTerm + ', ' + days);
    	SOCKET.emit('searchTopTrends', {
            searchTerm: searchTerm,
            days: days
        }, function(data){
        	console.log('response searchTopTrends: ' + searchTerm + ', ' + days);
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    }
}
