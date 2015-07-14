var utils = {
    // A utility function to safely escape JSON for embedding in a <script> tag
    safeStringify: function(obj) {
        return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
    },
    mediaUrl: function(mention) {
        var finalUrl = mention.fileLocation;
        var snippets = mention.mentionSnippet;
        var startTime, endTime, startSnippet, endSnippet;

        if (!finalUrl) {
            return '';
        }

        if (!snippets || snippets.length === 0) {
            return finalUrl;
        }

        startSnippet = snippets[0];
        if (!startSnippet) {
            return finalUrl;
        }

        if (snippets.length === 1) {
            endSnippet = snippets[0];
        } else {
            endSnippet = snippets[snippets.length - 1];
        }

        if (!endSnippet) {
            return finalUrl;
        }

        startTime = startSnippet.start;
        if (!startTime) {
            startTime = startSnippet.startTime;
        }

        endTime = endSnippet.end;
        if (!endTime) {
            endTime = endSnippet.endTime;
        }

        if (!startTime || !endTime) {
            return finalUrl;
        }

        return finalUrl + '#t=' + Math.floor(startTime) + ',' + Math.ceil(endTime);
    },
}

module.exports = utils;
