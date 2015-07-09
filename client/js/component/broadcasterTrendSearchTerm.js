'use strict';

var AppStore = require('../store/appStore'),
AppAction = require('../action/appAction'),
Constants = require('../constant/appConstant'),
Chart = require('react-google-charts').Chart,
React = require('react/addons');

var metaData = {
      label : "time",
      type: "date"
    };

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
        legend: { position: "right" },
        animation:{
          duration: 1000,
          easing: 'out',
          startup: true
        },
      };

module.exports = React.createClass({
  formatData: function(data){
    var formatData = {columns:[], rows:[]},
    hashTable = {};


    if(!data || data.length === 0){
      return formatData;
    }

    formatData.columns.push(metaData);

    //sort date
    data.sort(function(objA,objB){
      return Date.parse(objA.label) - Date.parse(objB.label);
    });

    //sort data based on terms
    for (var i = 0; i < data.length; i++) {
      var dataPoint = data[i];
      if(!hashTable[dataPoint.searchTerm]){
        hashTable[dataPoint.searchTerm] = [dataPoint];
      }else{
        hashTable[dataPoint.searchTerm].push(dataPoint);
      }
    };

    //build data
    for (var term in hashTable) {
      formatData.columns.push(    {
        label : term,
        type: "number"
      });
      if (hashTable.hasOwnProperty(term)) {
          var dataPoints = hashTable[term];
          for (var i = 0; i < dataPoints.length; i++) {
            var dataPoint = dataPoints[i];
            if(!formatData.rows[i]){
              formatData.rows.push([]);
              formatData.rows[i].push(new Date(dataPoint.label));
              formatData.rows[i].push(dataPoint.count);
            }else{
              formatData.rows[i].push(dataPoint.count);
            }
          };
      }
    }

    return formatData;
  },
  onChangeFilter: function() {
    AppAction.getTrends(AppStore.getSearchTerms(),AppStore.getFilter());
  },
  onChange: function() {
    var modData = this.formatData(AppStore.getTrends());
    this.setState({data: modData});
  },
  onSearchTermChange: function(){
    // this.setState({recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0});
    AppAction.getTrends(AppStore.getSearchTerms(),7);
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
    return React.createElement(Chart,{chartType:'LineChart', rows:this.state.data.rows, columns:this.state.data.columns, options:options});
  }
});
