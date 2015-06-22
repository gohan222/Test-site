'use strict';
var express = require('express'),
router = express.Router(),
uuid = require('node-uuid'),
config = require('../config'),
logger = require('../logger/logger'),
headerShare = require('../templates/header');

router.get('/error', function(req, res){
  //set common security headers.
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-XSS-Protection','1');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.render('error');
});

router.get('/', function(req, res){
  //set common security headers.
  res.render('index', headerShare);
});

module.exports = router;
