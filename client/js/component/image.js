'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
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

    return React.DOM.img({className:imgClasses, src:this.props.src, onLoad:this.onImageLoad});
    // return (
    //   <img ref="img" {...props} className={joinClasses(className, imgClasses)} />
    // );
  }
});