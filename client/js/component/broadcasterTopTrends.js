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
      if(items && items.length > 0){
        AppAction.filterTopMention( this.state.data[items[0].row+1][0]);  
      }else{
        AppAction.filterTopMention(null);
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

        if (!data || data.size === 0) {
            return formatData;
        }

        formatData.push(metaData);

        for (var i = 0; i < data.size; i++) {
            var searchTerms = data.get(i);
            formatData.push([searchTerms.get('term'), parseInt(searchTerms.get('count')), this.getRandomColor()]);
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
        AppAction.getTopTrends(AppStore.getFilter());
    },
    componentWillUnmount: function() {
        AppStore.removeChangeTopTrendsListener(this.onChange);
        AppStore.removeChangeFilterListener(this.onChangeFilter);
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
