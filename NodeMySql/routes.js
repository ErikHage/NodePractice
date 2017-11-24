const express = require('express');
const router = express.Router();

const Database = require('./lib/database');
const Promise = require('bluebird');

const rowMapper = require('./lib/datasource/beers/row-mapper');

const sendError = (statusCode, message) => {
  res.status(statusCode).send({
    message: message,
  });
};

router.get('/',(req, res, next) => {
  res.status(200).send({
    message: 'Service is running!',
  });
});

// router.post('/beer', (req, res, next) => {
//   const beer = req.body
// });

router.get('/beer/:id', (req, res, next) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM beers WHERE id = ?';

  Database.execQuery(sql, [ id ])
    .then((data) => {
      if(data.results.length < 1) {
        throw new Error('No data returned');
      }
      res
        .status(200)
        .send(rowMapper.fromRow(data.results[0]));
    })
    .catch((err) => {
      res
        .status(err.status || 500)
        .send({ message: err.message });
    })
});

module.exports = router;
