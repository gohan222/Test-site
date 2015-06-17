var SearchBody = require('../component/search'),
SearchHeader = require('../component/header'),
React = require('react');


React.render(
  React.createElement(SearchHeader),
  document.getElementById('headerFormSearch')
);

React.render(
  React.createElement(SearchBody, {url: "http://localhost:9090/search?confidence=12&includeSnippet=true&limit=25&offset=0&q=lakers"}),
  // React.createElement(MentionBox),
  document.getElementById('searchResult')
);