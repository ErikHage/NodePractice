const React = require('react');
const Link = require('react-router').Link;

const HomePage = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <p>React, React router, and flux for ultra-responsive web apps</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
});

module.exports = HomePage;