'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
Constants = require('../constant/appConstant'),
Chart = require('react-google-charts').Chart,
React = require('react/addons');

var metaData = ['Search Term', 'Count', { role: 'style' }];

var dataArray = [
         ['Element', 'Density', { role: 'style' }],
         ['Copper', 8.94, '#b87333'],            // RGB value
         ['Silver', 10.49, 'silver'],            // English color name
         ['Gold', 19.30, 'gold'],
         ['Platinum', 21.45, 'color: #e5e4e2' ] // CSS-style declaration
      ];
var options = {
        title: 'Top Trending Searches',
        width: '100%',
        height: 800,
        bar: {groupWidth: '95%'},
        legend: { position: 'none' },
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
    }

    return formatData;
  },
  onChangeFilter: function() {
    AppAction.getTopTrends(AppStore.getFilter());
  },
  onChange: function() {
    var modData = this.formatData(AppStore.getTopTrends());
    this.setState({data: modData});
  },
  onSearchTermChange: function(){
    // this.setState({recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0});
  },
  componentDidMount: function() {
    AppStore.addChangeTopTrendsListener(this.onChange);
    AppStore.addChangeFilterListener(this.onChangeFilter);

    //get the new list of trends
    AppAction.getTopTrends(1);
  },
  componentWillUnmount: function() {
    AppStore.removeChangeTopTrendsListener(this.onChange);
    AppStore.removeChangeFilterListener(this.onChangeFilter);
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    if (!this.state.data || this.state.data.length === 0){
      return React.DOM.div();  
    }
    
    options.title = 'Top Trending Searches ' + AppStore.getFilter() + ' day(s)';
    return React.createElement(Chart,{chartType:'ColumnChart', data:this.state.data, options:options});
  }
});
