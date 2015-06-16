'use strict';
var express = require('express'),
  router = express.Router(),
  service = require('../service/search'),
  urlParser = require('url'),
  logger = require('../logger/logger'),
  browserify = require('browserify'),
  literalify = require('literalify'),
  React = require('react'),
  DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
  // This is our React component, shared by server and browser thanks to browserify
  App = React.createFactory(require('../templates/homepage'));

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

// define the about route
router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');

    // `props` represents the data to be passed in to the React component for
    // rendering - just as you would pass data, or expose variables in
    // templates such as Jade or Handlebars.  We just use some dummy data
    // here (with some potentially dangerous values for testing), but you could
    // imagine this would be objects typically fetched async from a DB,
    // filesystem or API, depending on the logged-in user, etc.
    var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </script>',
      ]
    };

    // Here we're using React to render the outer body, so we just use the
    // simpler renderToStaticMarkup function, but you could use any templating
    // language (or just a string) for the outer page template
    var html = React.renderToStaticMarkup(body(null,

      // The actual server-side rendering of our component occurs here, and we
      // pass our data in as `props`. This div is the same one that the client
      // will "render" into on the browser from browser.js
      div({id: 'content', dangerouslySetInnerHTML: {__html:
        React.renderToString(App(props))
      }}),

      // The props should match on the client and server, so we stringify them
      // on the page to be available for access by the code run in browser.js
      // You could use any var name here as long as it's unique
      script({dangerouslySetInnerHTML: {__html:
        'var APP_PROPS = ' + safeStringify(props) + ';'
      }}),

      // We'll load React from a CDN - you don't have to do this,
      // you can bundle it up or serve it locally if you like
      script({src: '//fb.me/react-0.13.3.min.js'}),

      // Then the browser will fetch and run the browserified bundle consisting
      // of browser.js and all its dependencies.
      // We serve this from the endpoint a few lines down.
      script({src: 'page/bundle.js'})
    ));

    // Return the page to the browser
    res.end(html);
});

router.get('/bundle.js', function(req, res) {
  res.setHeader('Content-Type', 'text/javascript');

    // Here we invoke browserify to package up browser.js and everything it requires.
    // DON'T do it on the fly like this in production - it's very costly -
    // either compile the bundle ahead of time, or use some smarter middleware
    // (eg browserify-middleware).
    // We also use literalify to transform our `require` statements for React
    // so that it uses the global variable (from the CDN JS file) instead of
    // bundling it up with everything else
    browserify()
      .add('client/js/index.js')
      .transform(literalify.configure({react: 'window.React'}))
      .bundle()
      .pipe(res);
});

module.exports = router;
