'use strict';
var express = require('express'),
router = express.Router(),
config = require('../config'),
merge = require('merge'),
logger = require('../logger/logger'),
headerShare = require('../templates/header'),
contentShare = require('../templates/content'),
consumerTemplates = require('../templates/consumer'),
trendsTemplates = require('../templates/trends');

router.get('/error', function(req, res){
  //set common security headers.
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-XSS-Protection','1');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.render('error');
});

router.get('/', function(req, res){
  res.setHeader('Content-Type', 'text/html');
  res.end(consumerTemplates.render({hash:config.hash, user:req.session.user ? req.session.user.kvp : null}));
});

router.get('/:feature/:view', function(req, res, next){
  res.setHeader('Content-Type', 'text/html');
  console.log(req.params.feature);
  console.log(req.params.view);
  console.log(req.originalUrl);
  var options = {hash:config.hash, user:req.session.user ? req.session.user.kvp : null, view:req.params.view, path: req.originalUrl};
  switch(req.params.feature){
    case 'consumer':
      consumerTemplates.render(options, function(html){
        res.end(html);
      });
      break;
    case 'trends':
      if(req.session.user){
        trendsTemplates.render(options, function(html){
        res.end(html);
      });
      }else{
        res.redirect('/consumer/search');
      }
      break;
    default:
      next();
      // res.end(consumerTemplates.render({hash:config.hash, user:req.session.user ? req.session.user.kvp : null, view:req.params.view}));
      break;
  }

  // res.send('Done');
});

router.get('/logout', function(req, res){
	req.session.user = null;
  	res.redirect('/');
});

module.exports = router;
