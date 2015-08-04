'use strict';

require('../../css/bootstrap.css');
require('../../css/style.css');
require('../../css/font-awesome.min.css');
require('../../css/consumer.css');
require('../../css/default.css');
require('../../css/ext-page.css');
require('../../css/new-default.css');
require('../../css/override_consumer.css');
require('../../css/hamburger.css');
require('../../css/header.css');
require('../../css/transition.css');
require('../../css/button.css');
require('../../css/common.css');

var TrendBody = require('../component/trend'),
Header = require('../component/header'),
Hamburger = require('../component/hamburger'),
AppStore = require('../store/appStore'),
AppConstant = require('../constant/appConstant'),
ReactRouter = require('react-router'),
BroadcasterRouter = require('../router/broadcaster'),
// $ = require('jquery'),
React = require('react');

ReactRouter.run(BroadcasterRouter, ReactRouter.HistoryLocation, function(root, state) {
    React.render(React.createElement(root,{app:AppConstant.APP_BROADCASTER,user:window.APP.user}),
        document.getElementById('app'));
});
/*React.render(
  React.createElement(Header,{user:window.APP.user}),
  document.getElementById('app-header')
);

React.render(
  React.createElement(TrendBody, {app:AppConstant.APP_BROADCASTER}),
  document.getElementById('app-content')
);

React.render(
  React.createElement(Hamburger),
  document.getElementById('app-hamburger')
);

AppStore.addToggleHamburgerListener(function(){
  $('.content-container').toggleClass('content-container-show-hamburger');
});*/