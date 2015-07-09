'use strict';
var express = require('express'),
    router = express.Router(),
    service = require('../service/analytics'),
    urlParser = require('url'),
    logger = require('../logger/logger');

router.get('/topTrends', function(req, res) {
    var options = {
        url: urlParser.parse(req.url).query
    };

    service.getTopTrends(options, function(err, result, response) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        } else {
            res.setStatus(500).send(err);
        }

    }, res);
});

router.get('/trends', function(req, res) {

  var options = {
    searchTerms: req.query.q.split(','),
    days: req.query.days
  };

  service.getTrendsMetrics(options, function(err, result, response) {
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});


module.exports = router;
