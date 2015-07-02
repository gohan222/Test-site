var config = require('config');
var settings = {};

if (config.has('port')) {
  settings.port = config.get('port');
}

if (config.has('redirectUri')) {
  settings.redirectUri = config.get('redirectUri');
}

if (config.has('connectionString')) {
  settings.connectionString = config.get('connectionString');
}

if (config.has('clientId')) {
  settings.clientId = config.get('clientId');
}

if (config.has('clientSecret')) {
  settings.clientSecret = config.get('clientSecret');
}

if (config.has('sfOAuthUrl')) {
  settings.sfOAuthUrl = config.get('sfOAuthUrl');
}

if (config.has('appNamespace')) {
  settings.appNamespace = config.get('appNamespace');
}

if (config.has('tokenHeader')) {
  settings.tokenHeader = config.get('tokenHeader');
}

if (config.has('searchUrl')) {
  settings.searchUrl = config.get('searchUrl');
}

if (config.has('collectionUrl')) {
  settings.collectionUrl = config.get('collectionUrl');
}

if (config.has('ssoAuthUrl')) {
  settings.ssoAuthUrl = config.get('ssoAuthUrl');
}

settings.sfUrlCallback = settings.redirectUri + '/confirmation';
settings.oauthUrl = settings.sfOAuthUrl + '?client_id=' + settings.clientId + '&response_type=code&redirect_uri=' + settings.sfUrlCallback;

module.exports = settings;
