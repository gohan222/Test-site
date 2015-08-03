'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    var src = this.props.src ? this.props.src : 'https://s3.amazonaws.com/prod-veritone-ugc/cb5e52b4-a986-4e2b-b525-482319df3350%2Favatar%2F4Jm9LlpT8KqoLBlfxI0A_veritone-auth-icon.png';
    return {
      loaded: false,
      src: src
    };
  },

  onImageLoad: function() {
    if (this.isMounted()) {
      this.setState({loaded: true});
    }
  },

  componentDidMount: function() {
    /*var imgTag = this.refs.img.getDOMNode();
    var imgSrc = imgTag.getAttribute('src');
    // You may want to rename the component if the <Image> definition
    // overrides window.Image
    var img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = imgSrc;*/
  },

  render: function() {
    var imgClasses = 'image' + ' ' + this.props.className;
    if (this.state.loaded) {
      imgClasses = 'image-loaded' + ' ' + this.props.className;
    }

    return React.DOM.img({className:imgClasses, src:this.state.src, onLoad:this.onImageLoad});
    // return (
    //   <img ref="img" {...props} className={joinClasses(className, imgClasses)} />
    // );
  }
});