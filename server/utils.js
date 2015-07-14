var utils = {
    // A utility function to safely escape JSON for embedding in a <script> tag
    safeStringify: function(obj) {
        return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
    }
}

module.exports = utils;