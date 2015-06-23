'use strict';

var SearchBody = require('../component/search'),
SearchHeader = require('../component/header'),
FilterHeader = require('../component/filter'),
RelatedTopicsHeader = require('../component/relatedTopics'),
RelatedCollectionsHeader = require('../component/relatedCollections'),
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

AppStore.addToggleHamburgerListener(function(){
  $('.content-container').toggleClass('content-container-show-hamburger');
});