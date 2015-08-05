'use strict';
var express = require('express'),
    router = express.Router(),
    config = require('../config'),
    merge = require('merge'),
    logger = require('../logger/logger'),
    consumerTemplates = require('../templates/consumer'),
    Utils = require('../utils'),
    trendsTemplates = require('../templates/trends');

router.get('/error', function(req, res) {
    //set common security headers.
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.render('error');
});

router.get('/', function(req, res) {
    /*res.setHeader('Content-Type', 'text/html');
    res.end(consumerTemplates.render({
        hash: config.hash,
        user: req.session.user ? req.session.user.kvp : null
    }));*/
    res.redirect('/consumer/search');
});

router.get('/consumer', function(req, res, next) {
    res.redirect('/consumer/search');
});

router.get('/trends', function(req, res, next) {
    res.redirect('/trends/consumer');
});

router.get('/:feature/:view', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');

    var consumerViews = ['program', 'search'];
    var trendsViews = ['trending', 'search'];
    var feature = req.params.feature;
    var view = req.params.view;
    var options = {
        hash: config.hash,
        user: req.session.user ? req.session.user.kvp : null,
        view: req.params.view,
        path: req.originalUrl
    };
    switch (feature) {
        case 'consumer':
            if (Utils.inList(view, consumerViews)) {
                consumerTemplates.render(options, function(html) {
                    res.end(html);
                });
            } else {
                res.redirect('/consumer/search');
            }

            break;
        case 'trends':
            if (req.session.user) {
                if (Utils.inList(view, trendsViews)) {
                    trendsTemplates.render(options, function(html) {
                        res.end(html);
                    });
                } else {
                    res.redirect('/trends/trending');
                }

            } else {
                res.redirect('/consumer/search');
            }
            break;
        default:
            next();
            break;
    }

    // res.send('Done');
});

router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
