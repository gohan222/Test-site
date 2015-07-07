'use strict';
var express = require('express'),
    router = express.Router(),
    service = require('../service/mention'),
    logger = require('../logger/logger');

router.get('/mention', function(req, res) {
    var options = {
        user: req.session.user
    };

    service.getMentions(options, function(err, result, response) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        } else {
            res.setStatus(500).send(err);
        }

    }, res);
});

module.exports = router;
