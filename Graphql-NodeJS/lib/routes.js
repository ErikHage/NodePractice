const router = require('express').Router();

const graphqlController = require('./controllers/graphql');

router.use('/graphql', graphqlController);

module.exports = router;
