'use strict';
var express = require('express'),
router = express.Router(),
uuid = require('node-uuid'),
config = require('../config'),
logger = require('../logger/logger');

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
