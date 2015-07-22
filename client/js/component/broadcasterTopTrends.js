'use strict';

var AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    Constants = require('../constant/appConstant'),
    Chart = require('react-google-charts').Chart,
    React = require('react/addons');

var metaData = ['Search Term', 'Count', {
    role: 'style'
}];
var options = {
    title: 'Top Trending Searches',
    width: '100%',
    height: 400,
    bar: {
        groupWidth: '95%'
    },
    legend: {
        position: 'none'
    },
    animation: {
        duration: 1000,
        easing: 'out',
        startup: true
    },
};

module.exports = React.createClass({
    chartEvents: [{
        eventName: 'onmouseover',
        callback: function(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
            //console.log("mouseover the chart");
            //console.log(Chart);
        }
    }],
    onSelect: function(chart, items){
      /*console.log("select the chart");
      console.log(event1);
      console.log(event2);
      console.log(event3);*/
      if(items && items.length > 0){
        AppAction.filterTopMention(items[0].row);  
      }else{
        AppAction.filterTopMention(-1);
      }
      
    },
    getRandomColor: function() {
        var letters = '0123456789ABCDEF'.split('');
        // var letters = '01234567'.split('');
        var color = '#';
        for (var i = 0; i < 4; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        color += 'FF';
        console.log(color);
        return color;
    },
    formatData: function(data) {
        var formatData = [];

        if (!data || data.length === 0) {
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
        this.setState({
            data: modData
        });
    },
    onSearchTermChange: function() {
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

        //reset filter variable
        AppAction.filterTopMention(-1);
    },
    getInitialState: function() {
        return {};
    },
    render: function() {
        if (!this.state.data || this.state.data.length === 0) {
            return React.DOM.div();
        }

        options.title = 'Top Trending Searches ' + AppStore.getFilter() + ' day(s)';
        return React.createElement(Chart, {
            chartType: 'ColumnChart',
            data: this.state.data,
            options: options,
            onSelect: this.onSelect,
            chartEvents: this.chartEvents
            
        });
    }
});
