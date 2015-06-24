'use strict';

var SearchBody = require('../component/search'),
SearchHeader = require('../component/consumerHeader'),
FilterHeader = require('../component/filter'),
RelatedTopicsHeader = require('../component/relatedTopics'),
RelatedCollectionsHeader = require('../component/relatedCollections'),
Hamburger = require('../component/hamburger'),
AppStore = require('../store/appStore'),
$ = require('jquery'),
React = require('react');


React.render(
  React.createElement(SearchHeader),
  document.getElementById('app-header')
);

React.render(
  React.createElement(SearchBody),
  document.getElementById('app-content')
);