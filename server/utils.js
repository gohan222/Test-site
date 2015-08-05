var utils = {
    // A utility function to safely escape JSON for embedding in a <script> tag
    safeStringify: function(obj) {
        return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
    },
    mediaUrl: function(mention) {
        var finalUrl = mention.get('fileLocation');
        var snippets = mention.get('mentionSnippet');
        var startTime, endTime, startSnippet, endSnippet;

        if (!finalUrl) {
            return '';
        }

        if (!snippets || snippets.size === 0) {
            return finalUrl;
        }

        startSnippet = snippets.get(0);
        if (!startSnippet) {
            return finalUrl;
        }

        if (snippets.size === 1) {
            endSnippet = snippets.get(0);
        } else {
            endSnippet = snippets.get(snippets.size - 1);
        }

        if (!endSnippet) {
            return finalUrl;
        }

        startTime = startSnippet.get('start');
        if (!startTime) {
            startTime = startSnippet.get('startTime');
        }

        endTime = endSnippet.end;
        if (!endTime) {
            endTime = endSnippet.get('endTime');
        }

        if (!startTime || !endTime) {
            return finalUrl;
        }

        return finalUrl + '#t=' + Math.floor(startTime) + ',' + Math.ceil(endTime);
    },
    getSnippetText: function(snippets) {
        var text = '';
        if (!snippets) {
            return text;
        }

        for (var i = 0; i < snippets.size; i++) {
            text += snippets.get(i).get('text');
        };

        return text;
    },
    getTextFragment: function(snippets) {
        var text = '';
        if (!snippets || !snippets.get('textFragments').size > 0) {
            return text;
        }
        var textFragments = snippets.get('textFragments');
        for (var i = 0; i < textFragments.size; i++) {
            text += textFragments.get(i).get('text');
        };

        return text;
    },
    generateMentionKey:function(mention){
        if (!mention){
            return '';
        }

        var modMention = mention.set('transcriptUrl','');
        return JSON.stringify(modMention);
    },
    inList:function(item,list){
        if(!list || !item){
            return false;
        }

        for (var i = 0; i < list.length; i++) {
            if (list[i] === item ){
                return true;
            }
        };

        return false;
    }
}

module.exports = utils;
