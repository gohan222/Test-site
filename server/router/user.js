'use strict';
var express = require('express'),
    router = express.Router(),
    service = require('../service/user'),
    logger = require('../logger/logger');

router.post('/login', function(req, res) {
    var options = {
        username: req.body.username,
        password: req.body.password
    };

    logger.debug(req.body);

    service.login(options, function(err, result, response) {
        if (!err) {
            req.session.user = result;
            res.setHeader('Content-Type', 'application/json');
            res.send(result.kvp);
        } else {
            res.setStatus(500).send(err);
        }

    }, res);
});

module.exports = router;
