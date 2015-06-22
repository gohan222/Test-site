'use strict';

var SearchBody = require('../component/search'),
SearchHeader = require('../component/header'),
FilterHeader = require('../component/filter'),
RelatedTopicsHeader = require('../component/relatedTopics'),
RelatedCollectionsHeader = require('../component/relatedCollections'),
React = require('react');


React.render(
  React.createElement(SearchHeader),
  document.getElementById('app-header')
);

/*React.render(
  React.createElement(RelatedTopicsHeader),
  document.getElementById('relatedSearches')
);

React.render(
  React.createElement(RelatedCollectionsHeader),
  document.getElementById('relatedCollections')
);

React.render(
  React.createElement(FilterHeader),
  document.getElementById('resultCount')
);

React.render(
  React.createElement(SearchBody),
  document.getElementById('searchResult')
);*/