$ = jQuery = require('jquery');

const React = require('react');
const RouteHandler = require('react-router').RouteHandler;

const Header = require('./common/Header');

const App = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <div class="container-fluid">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;