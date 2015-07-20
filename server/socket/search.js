var service = require('../service/search');

module.exports = function(socket) {
    socket.on('search', function(data) {
        var options = {
        	url:'confidence=12&includeSnippet=true&limit=25&offset=0&q=' + data
        };

        service.getSearchResults(options, function(err, result, response) {
            socket.emit('search', result);
        });
    });
};
