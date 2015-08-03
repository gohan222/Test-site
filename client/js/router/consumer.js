var React = require('react'),
ReactRouter = require('react-router'),
ConsumerApp = require('../component/ConsumerApp');

var parentRoute = React.createElement(ReactRouter.Route, {
    path: '/consumer/:views',
    name:'consumer',
    handler: ConsumerApp
});

var routes = React.createElement(ReactRouter.Route, {
    history: ReactRouter.History
}, parentRoute);


module.exports = routes;