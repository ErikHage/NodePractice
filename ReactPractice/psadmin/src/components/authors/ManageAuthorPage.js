const React = require('react');
const Router = require('react-router');
const toastr = require('toastr');

const AuthorActions = require('../../actions/AuthorActions');
const AuthorStore = require('../../stores/AuthorStore');

const AuthorForm = require('./AuthorForm');

const ManageAuthorPage = React.createClass({
  mixins: [
    Router.Navigation,
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    },
  },

  getInitialState: function() {
    return {
      author: {
        id: '',
        firstName: '',
        lastName: '',
      },
      errors: {},
      dirty: false,
    }
  },

  componentWillMount: function() { //use this because it won't cause a re-render!
    const authorId = this.props.params.id; //from the path /author/:id

    if(authorId) {
      this.setState({
        author: AuthorStore.getAuthorById(authorId),
      });
    }
  },

  setAuthorState: function(event) {
    this.setState({dirty: true});
    const field = event.target.name;
    const value = event.target.value;
    this.state.author[field] = value;
    return this.setState({
      author: this.state.author,
    });
  },

  authorFormIsValid: function() {
    var isValid = true;
    this.state.errors = {}; //clear any previous errors

    if (this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 characters';
      isValid = false;
    }

    if (this.state.author.lastName.length < 3) {
      this.state.errors.lastName = 'Last name must be at least 3 characters';
      isValid = false;
    }

    this.setState({errors: this.state.errors});

    return isValid;
  },

  saveAuthor: function(event) {
    event.preventDefault();

    if(!this.authorFormIsValid()) {
      return;
    }

    if (this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }
    this.setState({dirty: false});
    toastr.success('Author saved.');
    this.transitionTo('authors');
  },

  render: function() {
    return (
      <div>
        <AuthorForm
          author={this.state.author}
          onChange={this.setAuthorState}
          onSave={this.saveAuthor}
          errors={this.state.errors} />
      </div>
    );
  },
});

module.exports = ManageAuthorPage;
