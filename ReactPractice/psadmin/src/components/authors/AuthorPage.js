const React = require('react');
const Router = require('react-router');
const Link = Router.Link;

const AuthorStore = require('../../stores/AuthorStore');
const AuthorActions = require('../../actions/AuthorActions');

const AuthorList = require('./AuthorList');

const AuthorsPage = React.createClass({
  getInitialState: function() {
    return {
      authors: AuthorStore.getAllAuthors(),
    };
  },

  componentWillMount: function() {
    AuthorStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    AuthorStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    this.setState({
      authors: AuthorStore.getAllAuthors(),
    });
  },

  render: function() {
    return (
      <div>
        <h1>Authors</h1>
        <Link to="addAuthor" className="btn btn-default">Add Author</Link>
        <AuthorList authors={this.state.authors} />
      </div>
    );
  }
});

module.exports = AuthorsPage;