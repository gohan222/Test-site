'use strict';

var AppStore = require('../store/appStore'),
    AppAction = require('../action/appAction'),
    Constants = require('../constant/appConstant'),
    Bootstrap = require('react-bootstrap'),
    ReactRouter = require('react-router'),
    React = require('react');

var ViewButton = React.createClass({
    mixins:[ReactRouter.Navigation],
    getInitialState: function() {
        return {
            recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0
        };
    },
    changeView: function() {
        // AppAction.changeView(this.props.view);
        this.transitionTo(this.props.view);
    },
    render: function() {
        return React.DOM.button({
            className: 'btn btn-default',
            type: 'button',
            onClick: this.changeView
        }, React.DOM.span({
            className: this.props.icon
        }));
    }
});

var DateFilter = React.createClass({
  onSelect: function(eventKey){
    switch(eventKey){
      case '1':
        AppAction.updateFilter(1);
        break;
      case '2':
        AppAction.updateFilter(7);
        break;
      case '3':
        AppAction.updateFilter(14);
        break;
      case '4':
        AppAction.updateFilter(21);
        break;
      case '5':
        AppAction.updateFilter(30);
        break;
      case '6':
        AppAction.updateFilter(90);
        break;
      case '7':
        AppAction.updateFilter(180);
        break;
      case '8':
        AppAction.updateFilter(270);
        break;
      case '9':
        AppAction.updateFilter(365);
        break;
      default:
        break;
    };
  },
  render: function() {
    var menuItem1 = React.createElement(Bootstrap.MenuItem,{eventKey:'1'},'1 Day'),
    menuItem2 = React.createElement(Bootstrap.MenuItem,{eventKey:'2'},'1 week'),
    menuItem3 = React.createElement(Bootstrap.MenuItem,{eventKey:'3'},'2 weeks'),
    menuItem4 = React.createElement(Bootstrap.MenuItem,{eventKey:'4'},'3 weeks'),
    menuItem5 = React.createElement(Bootstrap.MenuItem,{eventKey:'5'},'1 month'),
    menuItem6 = React.createElement(Bootstrap.MenuItem,{eventKey:'6'},'3 month'),
    menuItem7 = React.createElement(Bootstrap.MenuItem,{eventKey:'7'},'6 month'),
    menuItem8 = React.createElement(Bootstrap.MenuItem,{eventKey:'8'},'9 month'),
    menuItem9 = React.createElement(Bootstrap.MenuItem,{eventKey:'9'},'1 year'),
    dropdown;
    if(this.props.view === Constants.VIEW_TRENDING_SEARCH_TERMS_LIST){ 
      dropdown = React.createElement(Bootstrap.DropdownButton, {className:'trends-date-filter', title:'Date Range', onSelect:this.onSelect}, menuItem2, menuItem3, menuItem4, menuItem5);
    }else{
      dropdown = React.createElement(Bootstrap.DropdownButton, {className:'trends-date-filter', title:'Date Range', onSelect:this.onSelect}, menuItem1, menuItem2, menuItem3, menuItem4, menuItem5);
    }
    

    return dropdown;
  }
});

module.exports = React.createClass({
    onChange: function() {
        this.setState({
            recordCount: AppStore.getSearchResultsCount()
        });
    },
    onSearchTermChange: function() {
        this.setState({
            recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0
        });
    },
    onViewChange: function(){
      this.setState({
            view: AppStore.getView()
        });
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this.onChange);
        AppStore.addChangeSearchTermListener(this.onSearchTermChange);
        AppStore.addChangeViewListener(this.onViewChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onChange);
        AppStore.removeChangeSearchTermListener(this.onSearchTermChange);
        AppStore.removeChangeViewListener(this.onViewChange);
    },
    getInitialState: function() {
        return {
            recordCount: AppStore.getSearchResultsCount() ? AppStore.getSearchResultsCount() : 0,
            view: AppStore.getView()
        };
    },
    render: function() {
        var recordCount = this.state.recordCount;
        var clipsText = React.DOM.span({
            className: 'f22 mr20'
        }, 'Clips');
        var countText = React.DOM.b(null, recordCount);
        var buttons = this.props.buttonGroup.map(function(button) {
            return React.createElement(ViewButton, {
                view: button.view,
                icon: button.icon
            });
        });
        var buttonBar = React.DOM.div({
                className: 'btn-group',
                role: 'group'
            },
            buttons);


        var container, advFilter;

        if (this.props.app === Constants.APP_BROADCASTER) {
            advFilter = React.DOM.div({
                    className: 'adv-holder-trend'
                },
                buttonBar);
            container = React.DOM.span(null, React.createElement(DateFilter,{view:this.state.view}), advFilter)
        } else {
            advFilter = React.DOM.div({
                    className: 'adv-holder'
                },
                buttonBar);
            container = React.DOM.span(null, clipsText, countText, advFilter);
        }


        return React.DOM.div({
            className: 'page-title bb'
        }, container);
    }
});
