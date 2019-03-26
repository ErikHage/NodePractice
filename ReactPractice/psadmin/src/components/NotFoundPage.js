const React = require('react');
const Link = require('react-router').Link;

const NotFoundPage = React.createClass({
  render: function() {
    return(
      <div>
        <h1>Page Not Found</h1>
        <p>Whoops! sorry there is nothing to see here</p>
        <p><Link to="app">Back to Home</Link></p>
      </div>
    );
  },
});

module.exports = NotFoundPage;