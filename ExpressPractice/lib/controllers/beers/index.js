const Promise = require('bluebird');
const constants = require('../../helpers/constants');
const uuid = require('uuid/v4');

const BeerService = require('../../services/beer');
const beerService = new BeerService();

class BeersController {

  createBeer(req, res, next) {
    const beer = {
      beerId: uuid(),
      name: req.body.name,
      style: req.body.style,
      abv: req.body.abv,
      ibu: req.body.ibu,
      description: req.body.description ? req.body.description : '',
    };

    console.log(`In BeersController.createBeer with beer: ${beer.name}`);

    return beerService.createBeer(beer)
      .then((data) => res.status(constants.statusCodes.created).send(data))
      .catch(next);
  }

  getBeerById(req, res, next) {
    const beerId = req.params.beerId;

    console.log(`In BeersController.getBeerById with beerId: ${beerId}`);

    return beerService.getBeerById(beerId)
      .then((beer) => {
        if(beer !== undefined) {
          res.status(constants.statusCodes.ok).send(beer);
        } else {
          res.sendStatus(constants.statusCodes.notFound);
        }
      })
      .catch(next);
  }

  updateBeer(req, res, next) {
    const beer = {
      beerId: req.body.beerId,
      name: req.body.name,
      style: req.body.style,
      abv: req.body.abv,
      ibu: req.body.ibu,
      description: req.body.description ? req.body.description : '',
    };

    console.log(`In BeersController.updateBeer with beer: ${beer.name}`);

    return beerService.updateBeer(beer)
      .then((data) => res.status(constants.statusCodes.ok).send(data))
      .catch(next);
  }

  deleteBeer(req, res, next) {
    const beerId = req.params.beerId;

    console.log(`In BeersController.deleteBeer with beerId: ${beerId}`);

    return beerService.deleteBeer(beerId)
      .then((beer) => res.sendStatus(constants.statusCodes.ok))
      .catch(next);
  }

}

module.exports = BeersController;
