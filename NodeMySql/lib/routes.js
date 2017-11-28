const router = require('express').Router();

const BeersController = require('./controller/beers');
const validators = require('./model/validators');
const constraints = require('./middleware/constraints');

router.get('/health', (req, res) => {
  res.status(200).send({
    message: 'Service is running!',
  });
});

router.post('/api/beer',
  constraints.validateBody(validators.insertBeer),
  BeersController.createBeer);

router.get('/api/beer/:id',
  constraints.validateParams(validators.beerId),
  BeersController.getBeerById);

module.exports = router;
