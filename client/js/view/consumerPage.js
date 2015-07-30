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
React = require('react');


React.render(
  React.createElement(Header, {user:window.APP.user}),
  document.getElementById('app-header')
);

React.render(
  React.createElement(SearchBody, {view:window.APP.view}),
  document.getElementById('app-content')
);