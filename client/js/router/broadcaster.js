var React = require('react'),
ReactRouter = require('react-router'),
BroadcasterApp = require('../component/broadcasterApp');

var parentRoute = React.createElement(ReactRouter.Route, {
    path: '/trends/:views',
    name:'trends',
    handler: BroadcasterApp
});

var routes = React.createElement(ReactRouter.Route, {
    history: ReactRouter.History
}, parentRoute);


module.exports = routes;