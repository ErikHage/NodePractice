const Promise = require('bluebird');

const constants = require('../../helpers/constants');

const beerService = require('../../services/beer');

class BeersController {

  static createBeer(req, res, next) {
    const beer = {
      beerID: req.body.beerId,
      name: req.body.name,
      style: req.body.style,
      abv: req.body.abv,
      ibu: req.body.ibu,
      description: req.body.description,
    };

    console.log(`In BeersController.createBeer with beer: ${beer.name}`);

    return beerService.createBeer(beer)
      .then(() => res.sendStatus(constants.statusCodes.ok))
      .catch(next);
  }


}

module.exports = BeersController;
