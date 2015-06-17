var SearchBody = require('../component/search'),
SearchHeader = require('../component/header'),
React = require('react');


React.render(
  React.createElement(SearchHeader),
  document.getElementById('headerFormSearch')
);

React.render(
  React.createElement(SearchBody),
  document.getElementById('searchResult')
);