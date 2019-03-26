const React = require('react');
const Router = require('react-router');

const routes = require('./routes');
const InitializeActions = require('./actions/InitializeActions');

InitializeActions.initApp();

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});

//without hashes
// Router.run(routes, Router.HistoryLocation, function(Handler) {
//   React.render(<Handler />, document.getElementById('app'));
// });