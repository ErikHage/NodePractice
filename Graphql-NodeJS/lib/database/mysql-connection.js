const Client = require('mariasql');

const constants = require('../helpers/constants');

exports.getConnection = () => new Client(constants.db);
