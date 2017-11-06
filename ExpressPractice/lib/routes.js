const router = require('express').Router();

const beerController = require('./controllers/beers');

const constraints = require('./middlewares/constraints');
const validators = require('./model/validators');

router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/api/', (req, res, next) => {
    res.render('api', {});
});

router.get('/api/hello', (req, res, next) => {
    res.send({message: "Hello World!"});
});

router.post('/api/beer/create',
  constraints.validateBody(validators.beer),
  beerController.createBeer);

module.exports = router;
