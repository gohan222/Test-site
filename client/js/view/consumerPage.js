'use strict';

var SearchBody = require('../component/search'),
Header = require('../component/masterHeader'),
AppConstant = require('../constant/appConstant'),
React = require('react');


React.render(
  React.createElement(Header, {app:AppConstant.APP_CONSUMER}),
  document.getElementById('app-header')
);

React.render(
  React.createElement(SearchBody),
  document.getElementById('app-content')
);