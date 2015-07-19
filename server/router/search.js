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
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});

router.get('/transcript/:id', function(req, res) {

  var options = {
    url: urlParser.parse(req.url).query,
    id:req.params.id
  };

  service.getTranscript(options, function(err, result, response) {
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});

router.get('/program', function(req, res) {

  var options = {
    programIds : req.query.programIds,
    searchTerms : req.query.q
  };

  service.getSearchByPrograms(options, function(err, result, response) {
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});

router.get('/relatedTopics', function(req, res) {

  var options = {
    searchTerm: urlParser.parse(req.url).query
  };

  service.getRelatedTopics(options, function(err, result, response) {
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});

router.get('/relatedCollections', function(req, res) {

  var options = {
    searchTerm: urlParser.parse(req.url).query
  };

  service.getRelatedCollections(options, function(err, result, response) {
    if (response) {
      res.setHeader('Content-Type', 'application/json');
      response.send(result);
    }
  }, res);
});

module.exports = router;
