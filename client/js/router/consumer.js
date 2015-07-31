var React = require('react'),
ReactRouter = require('react-router'),
ConsumerViewContainer = require('../component/consumerViewContainer'),
SearchBody = require('../component/search'),
ProgramList = require('../component/consumerProgramList'),
MentionList = require('../component/consumerMentionList');

var view1 = React.createElement(ReactRouter.Route, {
            name: 'search',
            handler: MentionList
}),
view2 = React.createElement(ReactRouter.Route, {
    name: 'program',
    handler: ProgramList
});

var subRoute = React.createElement(ReactRouter.Route, {
    name:'consumer',
    handler: ConsumerViewContainer
}, view1, view2);

var parentRoute = React.createElement(ReactRouter.Route, {
    path: '/',
    handler: SearchBody
}, subRoute);

var routes = React.createElement(ReactRouter.Route, {
    history: ReactRouter.History
}, parentRoute);


module.exports = routes;