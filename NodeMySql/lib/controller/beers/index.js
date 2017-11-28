const BeersService = require('../../service/beers');

class BeersController {
  static createBeer(req, res) {
    const beer = req.body;

    BeersService.createBeer(beer)
      .then((data) => {
        res
          .status(201)
          .send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message });
      });
  }

  static getBeerById(req, res) {
    const id = req.params.id;

    BeersService.getBeerById(id)
      .then((beer) => {
        res
          .status(200)
          .send(beer);
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: err.message });
      });
  }
}

module.exports = BeersController;
