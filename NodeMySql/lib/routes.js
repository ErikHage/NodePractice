const router = require('express').Router();

const beersController = require('./controller/beers');
const validators = require('./model/validators');
const constraints = require('./middleware/constraints');
const asyncMiddleware = require('./middleware/asyncMiddleware');

router.get('/health', (req, res) => {
  res.status(200).send({
    message: 'Service is running!',
  });
});

router.post('/api/beer',
  constraints.validateBody(validators.insertBeer),
  asyncMiddleware(beersController.createBeer));

router.get('/api/beer/:id',
  constraints.validateParams(validators.beerId),
  asyncMiddleware(beersController.getBeerById));

router.put('/api/beer',
  constraints.validateBody(validators.updateBeer),
  asyncMiddleware(beersController.updateBeer));

router.delete('/api/beer/:id',
  constraints.validateParams(validators.beerId),
  asyncMiddleware(beersController.deleteBeerById));

module.exports = router;
