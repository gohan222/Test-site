'use strict';

var SearchBody = require('../component/search'),
SearchHeader = require('../component/header'),
FilterHeader = require('../component/filter'),
React = require('react');


React.render(
  React.createElement(SearchHeader),
  document.getElementById('headerFormSearch')
);

React.render(
  React.createElement(FilterHeader),
  document.getElementById('resultCount')
);

React.render(
  React.createElement(SearchBody),
  document.getElementById('searchResult')
);