'use strict';

require('../../css/bootstrap.min.css');
require('../../css/button.css');
require('../../css/common.css');
require('../../css/consumer.css');
require('../../css/header.css');
require('../../css/default.css');
require('../../css/ext-page.css');
require('../../css/font-awesome.min.css');
require('../../css/consumerHeader.css');
require('../../css/new-default.css');
require('../../css/override_consumer.css');
require('../../css/style.css');
require('../../css/transition.css');
require('../../fonts/glyphicons-halflings-regular.eot');

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