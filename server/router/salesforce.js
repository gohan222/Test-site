'use strict';
var express = require('express'),
router = express.Router(),
uuid = require('node-uuid'),
service = require('../service/salesforce'),
dal = require('../dal/salesforce'),
mapping = require('../model/salesforce'),
config = require('../config'),
logger = require('../logger/logger');

function updateAccessToken(options){
  dal.updateSalesforceAccessToken(options);
}

function createSalesforceAuth(err, response){
  if(err){
    logger.error(err);
    if(response && response.res){
      response.res.redirect('/error');
    }
    return;
  }

  //add auth object to sf instance to indicate auth was successful
  service.createSalesforceAuth(response, function(err, createAuthResponse){
    if(err){
      logger.error(err);
      if(createAuthResponse && createAuthResponse.res){
        createAuthResponse.res.redirect('/error');
      }
      return;
    }

    if(createAuthResponse && createAuthResponse.res){
      createAuthResponse.res.redirect(createAuthResponse.instanceUrl);
    }
  }, updateAccessToken);
}

function processOAuth(err, response){
  if(err){
    logger.error(err);
    if(response && response.res){
      response.res.redirect('/error');
    }
    return;
  }

  var options = mapping.copy(response);

  //check to see if salesforce organization is in the db
  dal.getConnectionByOrganizationId(options, function(err, dupResponse){
    if(err){
      logger.error(err);
      if(dupResponse && dupResponse.res){
        dupResponse.res.redirect('/error');
      }
    }

    if(!dupResponse){
      logger.error('duplicate response object is null.');
      return;
    }

    var options = mapping.copy(response);

    //in this case the account has already been registered.
    //update existing account with new data.
    if(dupResponse.organizationId){
      dal.updateSalesforceConnect(options, createSalesforceAuth);
    }else{
      //store auth properties in postgres
      dal.createSalesforceConnection(options, createSalesforceAuth);
    }
  });
}

// define the home page route
router.get('/', function(req, res) {
  var userToken = uuid.v4();
  res.redirect(config.oauthUrl + '&state=' + userToken);
});

// define the about route
router.get('/confirmation', function(req, res) {

  if (!req.query.code){
    var codeErr = new Error('confirmation code is empty.');
    logger.error(codeErr);
    res.redirect('/error');
    return;
  }

  if (!req.query.state){
    var stateErr = new Error('confirmation state is empty.');
    logger.error(stateErr);
    res.redirect('/error');
    return;
  }

  var options = {
    code: req.query.code,
    uuid: req.query.state,
    res:res
  };

  //get uer auth token
  service.getAccessToken(options, processOAuth);
});

router.get('/error', function(req, res){
  //set common security headers.
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-XSS-Protection','1');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.render('error');
});

router.get('/index', function(req, res){
  //set common security headers.
  res.render('index');
});

// router.get('/widget', function(req, res){
//   //set common security headers.
//   res.render('widget');
// });

module.exports = router;
