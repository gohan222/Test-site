'use strict';
var express = require('express'),
  router = express.Router(),
  service = require('../service/search'),
  urlParser = require('url'),
  logger = require('../logger/logger');

// define the about route
router.get('/', function(req, res) {

  var options = {
    url: urlParser.parse(req.url).query
  };

  service.getSearchResults(options, function(err, result, response) {
    logger.debug(result);
    logger.debug(err);
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});


module.exports = router;
