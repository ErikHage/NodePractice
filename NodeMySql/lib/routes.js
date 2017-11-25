const router = require('express').Router();

const BeersController = require('./controller/beers');
const validators = require('./model/validators');
const constraints = require('./middleware/constraints');

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Service is running!',
  });
});

// router.post('/beer', (req, res, next) => {
//   const beer = req.body
// });

router.get('/beer/:id',
  constraints.validateParams(validators.beerId),
  BeersController.getBeerById);

module.exports = router;
