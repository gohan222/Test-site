'use strict';

module.exports = {
    search: function(searchTerms, callback) {
        var todayDate = new Date();
        var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        todayDate.setDate(todayDate.getDate() - 14);
        var startDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        console.log('request search: ' + searchTerms);
        SOCKET.emit('search', {
            searchTerms: searchTerms,
            startDate: startDate,
            endDate: endDate
        }, function(data) {
            console.log('response search: ' + searchTerms);
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    searchByProgramId: function(programId, searchTerms, callback) {
        console.log('request searchByProgramId: ' + programId + ', ' + searchTerms);
        var todayDate = new Date();
        var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        todayDate.setDate(todayDate.getDate() - 14);
        var startDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        SOCKET.emit('searchByProgramId', {
            searchTerms: searchTerms,
            programId: programId,
            startDate: startDate,
            endDate: endDate
        }, function(data) {
            console.log('response searchByProgramId: ' + programId + ', ' + searchTerms);
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    },
    searchTopTrends: function(searchTerm, days, callback) {
        console.log('request searchTopTrends: ' + searchTerm + ', ' + days);
        var todayDate = new Date();
        var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        todayDate.setDate(todayDate.getDate() - days);
        var startDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        SOCKET.emit('searchTopTrends', {
            searchTerm: searchTerm,
            startDate: startDate,
            endDate: endDate
        }, function(data) {
            console.log('response searchTopTrends: ' + searchTerm + ', ' + days);
            if (callback) {
                callback.apply(this, [data]);
            }
        });
    }
}
