'use strict';
var pg = require('pg'),
mapping = require('../model/salesforce'),
config = require('../config'),
logger = require('../logger/logger');

var connString = config.connectionString;

function rollback(client, done) {

  if(!client){
    return;
  }

  client.query('ROLLBACK', function(err) {
    if (err) {
      logger.error(err);
    }

    if(done){
      done();
    }
  });
}

function commit(client, done, callback) {
  if(!client){
    if (callback) {
      var err = new Error('Postgres client is null.');
      callback.apply(this, [err]);
    }
    return;
  }

  client.query('COMMIT', function(err) {
    if (err) {
      logger.error(err);
    }

    if(done){
      done();
    }else{
      err = 'Done object was null';
    }

    if (callback) {
      callback.apply(this, [err]);
    }
  });
}

function executeQuery(sqlStatement, params, callback){
  if(!sqlStatement){
    if(callback){
      callback.apply(this,[new Error('sql statement is null'), null]);
    }
    return;
  }

  pg.connect(connString, function(err, client, done) {
    if (err) {
      logger.error('error fetching client from pool', err);
      done();
      if (callback) {
        callback.apply(this, [err, null]);
      }
      return;
    }
    client.query('BEGIN');
    client.query(sqlStatement, params,
      function(err, result) {
        if (err) {
          rollback(client, done);
          if (callback) {
            callback.apply(this, [err, null]);
          }
          return;
        }
        // logger.debug(result);
        commit(client, done, function(err) {
          if (err) {
            logger.error('error on commit ', err);
            rollback(client, done);
            if (callback) {
              callback.apply(this, [err, null]);
            }
            return;
          }

          if (callback) {
            callback.apply(this, [null, result]);
          }
        });
      });
  });

}

function executeSelectQuery(sqlStatement, params, callback){
  if(!sqlStatement){
    if(callback){
      callback.apply(this,[new Error('sql statement is null'), null]);
    }
    return;
  }

  pg.connect(connString, function(err, client, done) {
    if (err) {
      logger.error('error fetching client from pool', err);
      done();
      if (callback) {
        callback.apply(this, [err, null]);
      }
      return;
    }

    client.query(sqlStatement, params,
      function(err, result) {
        done();

        if (err) {
          if (callback) {
            callback.apply(this, [err, null]);
          }
          return;
        }

        if (callback) {
          callback.apply(this, [null, result]);
        }
      });
  });

}

var salesforceDal = {
  createSalesforceConnection: function(options, callback) {

    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is null'), options]);
      }
      return;
    }

    if(!options.organizationId){
      if(callback){
        callback.apply(this,[new Error('organizationId is null'), options]);
      }
      return;
    }

    if(!options.instanceUrl){
      if(callback){
        callback.apply(this,[new Error('instanceUrl is null'), options]);
      }
      return;
    }

    if(!options.accessToken){
      if(callback){
        callback.apply(this,[new Error('accessToken is null'), options]);
      }
      return;
    }

    if(!options.refreshToken){
      if(callback){
        callback.apply(this,[new Error('refreshToken is null'), options]);
      }
      return;
    }

    if(!options.uuid){
      if(callback){
        callback.apply(this,[new Error('uuid is null'), options]);
      }
      return;
    }

    var sqlStatement = 'INSERT INTO connection (uuid, access_token, instance_url, refresh_token, organization_id) VALUES ($1, $2, $3, $4, $5)';
    var params = [options.uuid, options.accessToken, options.instanceUrl, options.refreshToken, options.organizationId];
    executeQuery(sqlStatement, params, function(err, result){
      if (err) {
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      if (callback) {
        callback.apply(this, [null, options]);
      }
    });
  },

  deleteSalesforceConnectionByUuid: function(options, callback) {

    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is null'), options]);
      }
      return;
    }

    if(!options.uuid){
      if(callback){
        callback.apply(this,[new Error('uuid is null'), options]);
      }
      return;
    }

    var sqlStatement = 'DELETE FROM connection WHERE uuid = $1 ';
    var params = [options.uuid];
    executeQuery(sqlStatement, params, function(err, result){
      if (err) {
        logger.error('error running deleteSalesforceConnectionByUuid query ', err);
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      if(result.rowCount <= 0){
        if (callback) {
          callback.apply(this, [new Error('record not found'), options]);
        }
        return;
      }

      if (callback) {
        callback.apply(this, [null, options]);
      }
    });
  },

  updateSalesforceConnect: function(options, callback) {
    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is null'), options]);
      }
      return;
    }

    if(!options.organizationId){
      if(callback){
        callback.apply(this,[new Error('organizationId is null'), options]);
      }
      return;
    }

    if(!options.instanceUrl){
      if(callback){
        callback.apply(this,[new Error('instanceUrl is null'), options]);
      }
      return;
    }

    if(!options.accessToken){
      if(callback){
        callback.apply(this,[new Error('accessToken is null'), options]);
      }
      return;
    }

    if(!options.refreshToken){
      if(callback){
        callback.apply(this,[new Error('refreshToken is null'), options]);
      }
      return;
    }

    var sqlStatement = 'UPDATE connection SET access_token = $1, refresh_token = $2 WHERE organization_id = $3 AND instance_url = $4';
    var params = [options.accessToken, options.refreshToken, options.organizationId, options.instanceUrl];
    executeQuery(sqlStatement, params, function(err, result){
      if (err) {
        logger.error('error running updateSalesforceConnect query', err);
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      if (callback) {
        callback.apply(this, [null, options]);
      }
    });
  },

  updateSalesforceAccessToken: function(options, callback) {
    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is null'), options]);
      }
      return;
    }

    if(!options.accessToken){
      if(callback){
        callback.apply(this,[new Error('access token is null'), options]);
      }
      return;
    }

    if(!options.uuid){
      if(callback){
        callback.apply(this,[new Error('uuid is null'), options]);
      }
      return;
    }

    var sqlStatement = 'UPDATE connection SET access_token = $1 WHERE uuid = $2';
    var params = [options.accessToken, options.uuid];
    executeQuery(sqlStatement, params, function(err, result){
      if (err) {
        logger.error('error running updateSalesforceAccessToken query ', err);
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      if (callback) {
        callback.apply(this, [null, options]);
      }
    });
  },

  getConnectionByUuid: function(options, callback) {
    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is null'), options]);
      }
      return;
    }

    if(!options.uuid){
      if(callback){
        callback.apply(this,[new Error('uuid is missing'), options]);
      }
      return;
    }

    var sqlStatement = 'SELECT access_token, instance_url, uuid, refresh_token, organization_id FROM connection WHERE uuid = $1 LIMIT 1';
    var params = [options.uuid];
    executeSelectQuery(sqlStatement, params, function(err, result){
      if (err) {
        logger.error('error running getConnectionByUuid query', err);
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      var response = {};
      if (result.rowCount > 0) {
        response = mapping.copyFromDb(result.rows[0]);
      }
      // logger.debug(response);
      response.res = options.res;
      response.mention = options.mention;

      if (callback) {
        callback.apply(this, [null,response]);
      }
    });
  },

  getConnectionByOrganizationId: function(options, callback) {
    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is empty'), options]);
      }
      return;
    }

    if(!options.organizationId){
      if(callback){
        callback.apply(this,[new Error('organizationId is null'), options]);
      }
      return;
    }

    // logger.debug(options);

    var sqlStatement = 'SELECT access_token, instance_url, uuid, refresh_token, organization_id FROM connection WHERE organization_id =$1 AND instance_url = $2 LIMIT 1';
    var params = [options.organizationId, options.instanceUrl];
    executeSelectQuery(sqlStatement, params, function(err, result){
      // logger.debug(err);
      // logger.debug(result);
      if (err) {
        logger.error('error running getConnectionByOrganizationId query', err);
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      var response = {};
      response.res = options.res;
      if (result.rowCount > 0) {
        response = mapping.copyFromDb(result.rows[0]);
      }

      if (callback) {
        callback.apply(this, [null, response]);
      }
    });
  },

  checkApplicationToken: function(options, callback) {
    if(!options){
      if(callback){
        callback.apply(this,[new Error('options is null'), options]);
      }
      return;
    }

    if (!options.appToken){
      if(callback){
        callback.apply(this,[new Error('app token is null'), options]);
      }
      return;
    }

    var sqlStatement = 'SELECT app_token FROM application WHERE app_token = $1';
    var params = [options.appToken];
    executeSelectQuery(sqlStatement, params, function(err, result){
      if (err) {
        logger.error('error running checkApplicationToken query', err);
        if (callback) {
          callback.apply(this, [err, options]);
        }
        return;
      }

      var response = {};
      response.hasToken = result.rowCount > 0;
      response.res = options.res;

      if (callback) {
        callback.apply(this, [null,response]);
      }
    });
  }
};

module.exports = salesforceDal;
