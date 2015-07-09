'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
Constants = require('../constant/appConstant'),
Chart = require('react-google-charts').Chart,
React = require('react/addons');

var metaData = ['Search Term', 'Count', { role: 'style' }];

var dataArray = {
  columns : [
    {
      label : "time",
      type: "date"
    },
    {
      label : "Air Passengers",
      type: "number"
    },
    {
      label : "Plane",
      type: "number"
    }
  ],
  rows : [
    [new Date('2015-05-06'),11, 20],
    [new Date('2015-05-04'),11, 15],
    [new Date('2015-05-15'),11, 15]
  ]
};
var options = {
        title: "Trending Searches",
        width: '100%',
        height: 800,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        animation:{
          duration: 1000,
          easing: 'out',
          startup: true
        },
      };

module.exports = React.createClass({
  getRandomColor:function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },    
  formatData: function(data){
    var formatData = [];

    if(!data || data.length === 0){
      return formatData;
    }

    formatData.push(metaData);

    for (var i = 0; i < data.length; i++) {
      var searchTerms = data[i];
      formatData.push([searchTerms['term'], parseInt(searchTerms['count']), this.getRandomColor()]);
    };

    return formatData;
  },
  onChangeFilter: function() {
    AppAction.getTrends(AppStore.getSearchTerms(),AppStore.getFilter());
  },
  onChange: function() {
    var modData = this.formatData(AppStore.getTopTrends());
    this.setState({data: modData});
  },
  onSearchTermChange: function(){
    // this.setState({recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0});
    AppAction.getTrends(AppStore.getSearchTerms(),AppStore.getFilter());
  },
  componentDidMount: function() {
    AppStore.addChangeSearchTermListener(this.onSearchTermChange);
    AppStore.addChangeFilterListener(this.onChangeFilter);
    AppStore.addChangeTrendsListener(this.onChange);

    //get the new list of trends
    // AppAction.getTopTrends(AppStore.getFilter());
  },
  componentWillUnmount: function() {
    AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
    AppStore.removeChangeFilterListener(this.onChangeFilter);
    AppStore.removeChangeTrendsListener(this.onChange);
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    if (!this.state.data || this.state.data.length === 0){
      return React.DOM.div();  
    }
    
    options.title = 'Trending Searches ' + AppStore.getFilter() + ' day(s)';
    return React.createElement(Chart,{chartType:'LineChart', rows:dataArray.rows, columns:dataArray.columns, options:options});
  }
});
