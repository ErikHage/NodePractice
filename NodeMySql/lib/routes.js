const express = require('express');

const router = express.Router();

const Database = require('./database/index');
const rowMapper = require('./datasource/beers/row-mapper');

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Service is running!',
  });
});

// router.post('/beer', (req, res, next) => {
//   const beer = req.body
// });

router.get('/beer/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM beers WHERE id = ?';

  Database.execQuery(sql, [id])
    .then((data) => {
      if (data.results.length < 1) {
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
    });
});

module.exports = router;
