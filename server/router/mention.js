'use strict';
var express = require('express'),
router = express.Router(),
service = require('../service/salesforce'),
dal = require('../dal/salesforce'),
config = require('../config'),
logger = require('../logger/logger');

function updateAccessToken(options){
  dal.updateSalesforceAccessToken(options);
}

// middleware specific to this router
router.use(function InspectHeaderToken(req, res, next) {
  if (!req.headers[config.tokenHeader]){
    res.sendStatus(401);
    return;
  }

  //check to see if app_token is valid.
  var options = {
      appToken : req.headers[config.tokenHeader]
  };

  dal.checkApplicationToken(options, function(err, response){
    if(err){
      logger.error(err);
      res.status(500).send(err);
      return;
    }

    if(response && response.hasToken){
      next();
      return;
    }else{
      res.sendStatus(401);
      return;
    }
  });

});

// define the about route
router.post('/:id', function(req, res) {
  var mention = req.body;

  if (!req.body){
    res.status(400).send('post body is empty');
    return;
  }

  var options = {
    uuid:req.params.id,
    mention: mention,
    res: res
  };

  dal.getConnectionByUuid(options,function(err,response){
    if(err){
      logger.error(err);
      if(res){
        res.status(500).send(err);
        return;
      }
    }

    if(response && !response.uuid){
      if(res){
        res.status(404).send('user id not found');
      }
      return;
    }

    service.createSalesforceMention(response, function(err, mentionResponse){
      if(err){
        logger.error(err);
        if(res){
          res.status(500).send(err);
          return;
        }
      }

      if(res){
        res.sendStatus(204);
        return;
      }
    }, updateAccessToken);
  });
});


module.exports = router;
