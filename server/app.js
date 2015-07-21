'use strict';

var cluster = require('cluster'),
    config = require('./config'),
    webpack = require('webpack'),
    path = require('path'),
    redis = require('redis'),
    logger = require('./logger/logger'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    log4js = require('log4js'),
    RedisStore = require('connect-redis')(session);


//rquirement for sf secuirty review for static files.
var workers = process.env.WORKERS || require('os').cpus().length;

function startServer() {
    var express = require('express'),
        app = express();
    var server = require('http').createServer(app),
        sio = require('socket.io').listen(server),
        sticky = require('sticky-session');

    sticky(server).listen(config.port, function() {
        console.log('server started on ' + config.port + ' port');
    });

    var client = redis.createClient();
    client.on('connect', function() {
        logger.info('redis connected');
    });
    client.on('disconnect', function(err) {
        logger.info('redis disconnect: ' + err);
    });

    var sessionMiddleware = session({
        store: new RedisStore({
            host: 'localhost',
            port: 6379,
            client: client
        }),
        resave: false,
        saveUninitialized: false,
        secret: 'veritonemedia',
        key: 'vertione.sid',
        cookie: {
            maxAge: 1000000
        }
    });


    app.use(sessionMiddleware);
    sio.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    // assign the dust engine to .dust files
    app.use(bodyParser.json()); // for parsing app/json
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //apply static location
    var oneYear = 31536000000;
    app.use(express.static('client', {
        maxAge: oneYear
    }));


    app.use(log4js.connectLogger(logger, {
        level: log4js.levels.INFO,
        format: ':remote-addr - - ":method :url" http-status: :status ":referrer" response-time: :response-time ms'
    }));



    app.use(function(req, res, next) {
        if (!req.session) {
            return next(new Error('redis session not connected.')) // handle error
        }
        next() // otherwise continue
    })

    //web apis
    //can return redirects and html.
    app.use('/', require('./router/searchPage'));

    //app apis
    //should return data and status codes.
    app.use('/search', require('./router/search'));

    //app apis
    // should return data and status codes.

    app.use('/user', require('./router/user'));

    app.use('/', require('./router/mention'));
    app.use('/analytics', require('./router/analytics'));

    sio.on('connection', function(socket) {
        logger.info('user connected');

        require('./socket/search')(socket);

        socket.on('disconnect', function() {
            logger.info('user disconnected');
        });
    });


    // app.listen(config.port);
};

function preprocess(callback) {
    var ExtractTextPlugin = require("extract-text-webpack-plugin"),
        compilerSettings = {
            entry: {
                consumer: './client/js/view/consumerPage.js',
                broadcaster: './client/js/view/broadcasterPage.js'
            },
            output: {
                path: './client/dist',
                filename: '[name].[hash].js',
                publicPath: '/'
            },
            module: {
                loaders: [{
                    test: /\.css$/,
                    // loader: 'style-loader!css-loader'
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                }, {
                    test: /\.png$/,
                    loader: "url-loader?limit=100000"
                }, {
                    test: /\.jpg$/,
                    loader: "file-loader"
                }]
            },
            plugins: [new ExtractTextPlugin('[name].[hash].css')]
        };

    if (process.env.NODE_ENV === 'production') {
        compilerSettings.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    // returns a Compiler instance
    var compiler = webpack(compilerSettings)
    compiler.run(function(err, stats) {
        // var css = require('./../client/css/button.css');
        // var css = require('./../client/css/style.css');
        // console.log('css loader');
        // console.log(css);
        logger.info('version: ' + stats.hash);
        config.hash = stats.hash;

        var jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0) {
            logger.error(jsonStats.errors);
            return;
        }
        if (jsonStats.warnings.length > 0) {
            logger.warn(jsonStats.warnings);
        }
        if (err) {
            logger.error(err);
            return;
        }

        // startServer();
        if (callback) {
            callback.apply(this, []);
        }

    });
};

if (cluster.isMaster) {

    /*logger.info('environment: ' + process.env.NODE_ENV);
    logger.info('port: ' + config.port);
    logger.info('start cluster with %s workers', workers);

    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        logger.debug('worker %s started.', worker.pid);
    }*/

    //sticky session on master to start cluster process
    var express = require('express')();
    var server = require('http').createServer(express);
    var sticky = require('sticky-session');

    sticky(server).listen(config.port, function() {
        console.log('is master: ' + cluster.isMaster);
        console.log('server started on ' + config.port + ' port');
    });

    cluster.on('exit', function(worker) {
        logger.info('worker %s died. restart...', worker.process.pid);
        cluster.fork();
    });

} else {
    preprocess(function() {
        startServer();
    });
}

process.on('uncaughtException', function(err) {
    logger.error('uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
});
