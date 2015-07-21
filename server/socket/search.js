var service = require('../service/search'),
    logger = require('../logger/logger');

module.exports = function(socket) {
    socket.on('search', function(data, callback) {
        logger.debug('search request: ' + data.searchTerms + ', ' + data.startDate + ', ' + data.endDate);

        var options = {
            url: 'confidence=12&includeSnippet=true&limit=25&offset=0&q=' + data.searchTerms + '&startDate=' + data.startDate + '&endDate=' + data.endDate
        };

        service.getSearchResults(options, function(err, result, response) {
            logger.debug('search response: ' + data.searchTerms + ', ' + data.startDate + ', ' + data.endDate);

            callback(JSON.parse(result));
        });
    });

    socket.on('searchByProgramId', function(data, callback) {
        logger.debug('searchByProgramId request: ' + data.programId + ', ' + data.searchTerms);
        var options = {
            url: 'confidence=12&includeSnippet=true&limit=25&offset=0&q=' + data.searchTerms + '&programIds=' + data.programId
        };

        service.getSearchResults(options, function(err, result, response) {
            logger.debug('searchByProgramId response: ' + data.programId + ', ' + data.searchTerms);
            var mergedResponse = {
                records: []
            };
            var resBody = JSON.parse(result);
            if (resBody.records && resBody.records.length > 0) {
                mergedResponse.records.push({
                    programId: resBody.records[0].programId,
                    records: resBody.records
                });
            }

            callback(mergedResponse);
        });
    });

    socket.on('searchTopTrends', function(data, callback) {
        logger.debug('searchTopTrends request: ' + data.searchTerm + ', ' + data.startDate + ', ' + data.endDate);
        var options = {
            url: 'confidence=12&includeSnippet=true&limit=25&offset=0&q=' + data.searchTerm + '&startDate=' + data.startDate + '&endDate=' + data.endDate
        };

        service.getSearchResults(options, function(err, result, response) {
            logger.debug('searchTopTrends response: ' + data.searchTerm + ', ' + data.startDate + ', ' + data.endDate);
            var resBody = JSON.parse(result);

            callback({
                searchTerm: data.searchTerm,
                records: resBody.records
            });
        });
    });

};
