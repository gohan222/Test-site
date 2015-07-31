'use strict';

require('../../css/bootstrap.css');
require('../../css/style.css');
require('../../css/font-awesome.min.css');
require('../../css/consumer.css');
require('../../css/default.css');
require('../../css/ext-page.css');
require('../../css/new-default.css');
require('../../css/override_consumer.css');
require('../../css/consumerHeader.css');
require('../../css/transition.css');
require('../../css/button.css');
require('../../css/common.css');

var SearchBody = require('../component/search'),
    Header = require('../component/consumerHeader'),
    AppConstant = require('../constant/appConstant'),
    ReactRouter = require('react-router'),
    ConsumerViewContainer = require('../component/consumerViewContainer'),
    ConsumerRouter = require('../router/consumer'),
    React = require('react');


React.render(
    React.createElement(Header, {
        user: window.APP.user
    }),
    document.getElementById('app-header')
);

ReactRouter.run(ConsumerRouter, ReactRouter.HistoryLocation, function(root) {
    React.render(React.createElement(root),
        document.getElementById('app-content'));
});

/*React.render(
  React.createElement(SearchBody, {view:window.APP.view}),
  document.getElementById('app-content')
);*/

/*React.render((
  <ReactRouter.Router history={history}>
    <ReactRouter.Route path="/" component={SearchBody}>
      <ReactRouter.Route path="search" component={About}/>
      <ReactRouter.Route path="program" component={Users}>
        <ReactRouter.Route path="/user/:userId" component={User}/>
      </ReactRouter.Route>
      <ReactRouter.Route path="*" component={NoMatch}/>
    </ReactRouter.Route>
  </ReactRouter.Router>
), document.getElementById('app-content'));*/
