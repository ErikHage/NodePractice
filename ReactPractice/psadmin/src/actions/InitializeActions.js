const Dispatcher = require('../dispatcher/AppDispatcher');
const ActionTypes = require('../constants/ActionTypes');
const AuthorApi = require('../api/authorApi');

const InitializeActions = {
  initApp: function () {
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {
        authors: AuthorApi.getAllAuthors(),
      }
    });
  }
};

module.exports = InitializeActions;