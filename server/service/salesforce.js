'use strict';
var sf = require('jsforce'),
mapping = require('../model/salesforce'),
config = require('../config'),
logger = require('../logger/logger');

var oauth2 = {
  clientId : config.clientId,
  clientSecret : config.clientSecret,
  redirectUri : config.sfUrlCallback
};

var salesforceService = {
  getAccessToken: function(options, callback) {
    if(!options){
      if (callback){
        callback.apply(this,[new Error('options is null'), null]);
      }
      return;
    }

    var conn = new sf.Connection({
      oauth2: oauth2
    });

    var code = options.code;
    conn.authorize(code, function(err, response) {
      if (err) {
        logger.error(err);
        if (callback){
          callback.apply(this,[err, options]);
        }
        return;
      }
      logger.debug('response success');
      var returnResponse ={
        uuid: options.uuid,
        accessToken: conn.accessToken,
        refreshToken: conn.refreshToken,
        instanceUrl: conn.instanceUrl,
        organizationId: response.organizationId,
        res: options.res
      };

      if(callback){
        logger.debug('callback executed');
        callback.apply(this, [null, returnResponse]);
      }
    });
  },
  createSalesforceMention: function(options, callback, refershCallback){
    if(!options){
      if (callback){
        callback.apply(this,[new Error('options is null'), null]);
      }
      return;
    }

    var conn = new sf.Connection({
      oauth2: oauth2,
      instanceUrl: options.instanceUrl,
      accessToken: options.accessToken,
      refreshToken: options.refreshToken
    });

    conn.on('refresh', function(accessToken, res) {
      // Refresh event will be fired when renewed access token
      // to store it in your storage for next request
      var refreshOptions = {
        accessToken: accessToken,
        uuid: options.uuid
      };

      if(refershCallback){
        refershCallback.apply(this, [refreshOptions]);
      }

    });

    var sfMention = mapping.copyFromMentionToSfMention(options.mention);

  conn.sobject('Veritone__Mention__c')
    .create(sfMention, function(err, response) {
      if (err) {
        logger.error(err);
        if (callback){
          callback.apply(this,[err, options]);
        }
        return;
      }

      if (!response.success){
        if (callback){
          callback.apply(this,[response.errors, options]);
        }
      }

      if(callback){
        callback.apply(this, [null, options]);
      }

    });
  },
  createSalesforceAuth:function(options, callback, refreshCallback){
    if(!options){
      return new Error('options is null');
    }

    var conn = new sf.Connection({
      oauth2: oauth2,
      instanceUrl: options.instanceUrl,
      accessToken: options.accessToken,
      refreshToken: options.refreshToken
    });

    conn.on('refresh', function(accessToken, res) {
      // Refresh event will be fired when renewed access token
      // to store it in your storage for next request
      var refreshOptions = {
        accessToken: accessToken,
        uuid: options.uuid
      };

      if(refreshCallback){
        refreshCallback.apply(this, [refreshOptions]);
      }

    });

    var veritoneAuth = {};
    veritoneAuth['Veritone__User_Id__c'] = options.uuid;


    conn.sobject('Veritone__VeritoneAuth__c')
    .create(veritoneAuth, function(err, response) {

      if (err || !response.success) {
        logger.error(err);
        if (callback){
          callback.apply(this,[err, options]);
        }

        return;
      }

      var returnResponse ={
        uuid: options.uuid,
        accessToken: conn.accessToken,
        refreshToken: conn.refreshToken,
        instanceUrl: conn.instanceUrl,
        organizationId: response.organizationId,
        res: options.res
      };

      if(callback){
        callback.apply(this, [null, returnResponse]);
      }

    });
  },
};

module.exports = salesforceService;
