'use strict';

var SearchBody = require('../component/search'),
Header = require('../component/masterHeader'),
Hamburger = require('../component/hamburger'),
AppStore = require('../store/appStore'),
AppConstant = require('../constant/appConstant'),
$ = require('jquery'),
React = require('react');


React.render(
  React.createElement(Header,{app:AppConstant.APP_BROADCASTER}),
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