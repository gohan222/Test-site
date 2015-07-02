'use strict';
var express = require('express'),
router = express.Router(),
config = require('../config'),
merge = require('merge'),
logger = require('../logger/logger'),
headerShare = require('../templates/header'),
contentShare = require('../templates/content');

router.get('/error', function(req, res){
  //set common security headers.
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-XSS-Protection','1');
  res.setHeader('X-Frame-Options','SAMEORIGIN');
  res.render('error');
});

router.get('/', function(req, res){
  res.render('consumer', merge(headerShare, contentShare, {hash:config.hash, user:req.session.user ? req.session.user.kvp : null}));
});

router.get('/logout', function(req, res){
	req.session.user = null;
  	res.redirect('/');
});


router.get('/trends', function(req, res){
	if(!req.session.user){
		res.redirect('/consumer');
		return;
	}
  res.render('index', merge(headerShare, contentShare, {hash:config.hash, user:req.session.user ? req.session.user.kvp : null}));
});

router.get('/consumer', function(req, res){
	res.render('consumer', merge(headerShare, contentShare, {hash:config.hash, user:req.session.user ? req.session.user.kvp : null}));
});

module.exports = router;
