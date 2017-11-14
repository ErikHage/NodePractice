const router = require('express').Router();

const BeerController = require('./controllers/beers');
const beerController = new BeerController();

const constraints = require('./middlewares/constraints');
const validators = require('./model/validators');

// router.get('/', function(req, res, next) {
//     res.render('index', {});
// });
// router.get('/api/', (req, res, next) => {
//     res.render('api', {});
// });
// router.get('/api/hello', (req, res, next) => {
//     res.send({message: "Hello World!"});
// });

router.post('/api/beer',
  constraints.validateBody(validators.beer.insert),
  beerController.createBeer);

router.get('/api/beer/:beerId',
  constraints.validateParams(validators.beer.id),
  beerController.getBeerById);

router.put('/api/beer',
  constraints.validateBody(validators.beer.update),
  beerController.updateBeer);

router.delete('/api/beer/:beerId',
  constraints.validateParams(validators.beer.id),
  beerController.deleteBeer);

module.exports = router;
