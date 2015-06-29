'use strict';

var cluster = require('cluster'),
    config = require('./config'),
    compress = require('compression'),
    webpack = require('webpack'),
    path = require('path'),
    logger = require('./logger/logger');


//rquirement for sf secuirty review for static files.
var workers = process.env.WORKERS || require('os').cpus().length - 1;

//gurantee one worker
if (workers <= 0) {
    workers = 1;
}

if (cluster.isMaster) {

    logger.info('environment: ' + process.env.NODE_ENV);
    logger.info('port: ' + config.port);
    logger.info('start cluster with %s workers', workers);

    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        logger.debug('worker %s started.', worker.pid);
    }

    cluster.on('exit', function(worker) {
        logger.info('worker %s died. restart...', worker.process.pid);
        cluster.fork();
    });

} else {

    var express = require('express'),
        cons = require('consolidate'),
        bodyParser = require('body-parser'),
        app = express(),
        ExtractTextPlugin = require("extract-text-webpack-plugin"),
        compilerSettings = {
            entry: {
                consumer: './client/js/view/consumerPage.js',
                broadcaster: './client/js/view/broadcasterPage.js'
            },
            output: {
                path: './client/dist',
                filename: '[name].[hash].js'
            },
            module: {
                loaders: [{
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                    }, {
                        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: "url-loader?limit=10000&minetype=application/font-woff"
                    }, {
                        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: "file-loader"
                    }]
                    /*loaders: [{
                        test: /\.css$/i,
                        loader: "css"
                    }, {
                        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                        loader: "file"
                    }]*/
            },
            plugins: [new ExtractTextPlugin('[name].[hash].css')]
        };

    if (process.env.NODE_ENV === 'production') {
        compilerSettings.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    // returns a Compiler instance
    var compiler = webpack(compilerSettings);

    var startServer = function() {
        // assign the dust engine to .dust files
        app.use(compress());
        app.use(bodyParser.json()); // for parsing application/json
        app.use(bodyParser.urlencoded({
            extended: true
        })); // for parsing application/x-www-form-urlencoded
        app.engine('dust', cons.dust);
        app.set('view engine', 'dust');
        app.set('views', __dirname + '/view');

        //apply static location
        app.use(express.static('client'));

        // middleware specific to this router
        app.use(function UrlLog(req, res, next) {
            logger.info(req.method + ' ' + req.originalUrl);
            next();
        });

        //web apis
        //can return redirects and html.
        app.use('/', require('./router/searchPage'));

        //app apis
        //should return data and status codes.
        app.use('/search', require('./router/search'));

        //app apis
        // should return data and status codes.
        app.use('/page', require('./router/index'));

        app.listen(config.port);
    };

    compiler.run(function(err, stats) {
        // var css = require('./../client/css/button.css');
        // var css = require('./../client/css/style.css');
        // console.log('css loader');
        // console.log(css);
        logger.info('version: ' + stats.hash);
        config.hash = stats.hash;
        if (!err) {
            startServer();
        } else {
            console.log(err);
        }

    });
}

process.on('uncaughtException', function(err) {
    logger.error('uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});
