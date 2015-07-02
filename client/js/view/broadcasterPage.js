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

var SearchBody = require('../component/search'),
Header = require('../component/masterHeader'),
Hamburger = require('../component/hamburger'),
AppStore = require('../store/appStore'),
AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
React = require('react');


React.render(
  React.createElement(Header,{app:AppConstant.APP_BROADCASTER, user:window.APP.user}),
  document.getElementById('app-header')
);

React.render(
  React.createElement(SearchBody),
  document.getElementById('app-content')
);

React.render(
  React.createElement(Hamburger),
  document.getElementById('app-hamburger')
);

AppStore.addToggleHamburgerListener(function(){
  $('.content-container').toggleClass('content-container-show-hamburger');
});