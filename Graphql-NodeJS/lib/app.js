require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');
const errorLogger = require('./middleware/error-logger');
const errorHandler = require('./middleware/error-handler');

global.appRoot = path.resolve(__dirname);

const app = express();

// view engine setup
// app.set('views', path.join(global.appRoot, 'views'));
// app.set('view engine', 'ejs');

app.use(favicon(path.join(global.appRoot, 'public/images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(global.appRoot, 'public')));

app.use('/', routes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
