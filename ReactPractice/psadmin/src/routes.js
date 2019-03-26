const React = require('react');

const Router = require('react-router');
const DefaultRoute = Router.DefaultRoute;
const Route = Router.Route;
const NotFoundRoute = Router.NotFoundRoute;
const Redirect = Router.Redirect;

const routes = (
  <Route name="app" path="/" handler={require('./components/App')}>
    <DefaultRoute handler={require('./components/HomePage')}/>

    <Route name="authors" handler={require('./components/authors/AuthorPage')}/>
    <Route name="about" handler={require('./components/about/AboutPage')}/>
    <Route name="addAuthor" path="author" handler={require('./components/authors/ManageAuthorPage')} />
    <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/ManageAuthorPage')} />

    <NotFoundRoute handler={require('./components/NotFoundPage')}/>

    <Redirect from="about-us" to="about" />
    <Redirect from="about/*" to="about" />
    <Redirect from="awthors" to="authors" />
  </Route>
);

module.exports = routes;