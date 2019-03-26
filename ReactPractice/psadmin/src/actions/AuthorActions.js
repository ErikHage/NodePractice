const Dispatcher = require('../dispatcher/AppDispatcher');

const authorApi = require('../api/authorApi');
const ActionTypes = require('../constants/ActionTypes');

const AuthorActions = {
  createAuthor: function(author) {
    const newAuthor = authorApi.saveAuthor(author);

    // Hey dispatcher, go tell all the stores that an author was just created
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: newAuthor,
    });
  },

  updateAuthor: function(author) {
    const updatedAuthor = authorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor,
    });
  },

  deleteAuthor: function(id) {
    authorApi.deleteAuthor(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id,
    });
  },
};

module.exports = AuthorActions;