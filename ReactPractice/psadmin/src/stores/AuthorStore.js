const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const Dispatcher = require('../dispatcher/AppDispatcher');
const ActionTypes = require('../constants/ActionTypes');

const CHANGE_EVENT = 'change';

var authors = [];

const AuthorStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllAuthors: function() {
    return authors;
  },

  getAuthorById: function(id) {
    return _.find(authors, {id: id});
  }
});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      authors.push(action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      const existingAuthor = _.find(authors, {id: action.author.id});
      const existingAuthorIndex = _.indexOf(authors, existingAuthor);
      authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      _.remove(authors, function(author) {
        return action.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
      // no-op
  }
});

module.exports = AuthorStore;