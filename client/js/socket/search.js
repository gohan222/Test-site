'use strict';

module.exports = {
    search: function(searchTerms, callback) {
        SOCKET.on('search', function(msg) {
            if(callback){
            	callback.apply(this, [JSON.parse(msg)]);
            } 
        });
        SOCKET.emit('search', searchTerms);
    }
}
