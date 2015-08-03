'use strict';

var React = require('react'),
    AppAction = require('../action/appAction'),
    SearchBody = require('../component/search'),
    Header = require('../component/consumerHeader'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    ReactRouter = require('react-router');


module.exports = React.createClass({
    mixins: [ReactRouter.State, PureRenderMixin],
    componentWillMount:function(){
    //initialize data store before mounting values.
        if(this.props.query.q){
          AppAction.changeSearchTerm(this.props.query.q);
        }
    },
    render: function() {
        console.log('props consumer app.');
        console.log(this.props);
        return React.DOM.div({
                className: 'content-container'
            },
            React.DOM.div({
                    id: 'app-header'
                },
                React.createElement(Header, 
                    this.props
                )),
            React.DOM.div({
                id: 'app-content'
            }, React.createElement(SearchBody,
                this.props
            ))
        );
    }
});
