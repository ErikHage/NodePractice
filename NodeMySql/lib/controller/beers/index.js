const BeersService = require('../../service/beers');

class BeersController {
  static getBeerById(req, res) {
    const { id } = req.params;

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
