var React = require('react'),
LazyLoadImg = require('../component/image');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      src: '',
      poster:'',
      fileType:''
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    var player, img;
    if(this.props.fileType.indexOf('video') >= 0){
      player = React.DOM.video({className:'program-video-control', src:this.props.src, controls:true, autoPlay:true, preload:'metadata'});
      return React.DOM.div(null,player);
    }else{
      var img = React.createElement(LazyLoadImg,{className:'program-player-img', src:this.props.poster});
      player = React.DOM.audio({className:'program-player-control', src:this.props.src, controls:true, autoPlay:true, preload:'metadata'});
      return React.DOM.div(null, img,player); 
    }
  }
});