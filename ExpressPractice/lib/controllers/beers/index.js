const constants = require('../../helpers/constants');
const uuid = require('uuid/v4');

const BeerService = require('../../services/beer');

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

    return BeerService.createBeer(beer)
      .then((data) => res.status(constants.statusCodes.created).send(data))
      .catch(next);
  }

  getBeerById(req, res, next) {
    const beerId = req.params.beerId;

    return BeerService.getBeerById(beerId)
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

    return BeerService.updateBeer(beer)
      .then((data) => res.status(constants.statusCodes.ok).send(data))
      .catch(next);
  }

  deleteBeer(req, res, next) {
    const beerId = req.params.beerId;

    return BeerService.deleteBeer(beerId)
      .then((beer) => res.sendStatus(constants.statusCodes.ok))
      .catch(next);
  }

}

module.exports = BeersController;
