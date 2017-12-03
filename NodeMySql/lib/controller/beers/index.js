const beersService = require('../../service/beers');

class BeersController {
  async createBeer(req, res) {
    const beer = req.body;
    const data = await beersService.createBeer(beer);
    res.status(201).send(data);
  }

  async getBeerById(req, res) {
    const id = req.params.id;
    const beer = await beersService.getBeerById(id);
    res.status(200).send(beer);
  }

  async updateBeer(req, res) {
    const beer = req.body;
    const data = await beersService.updateBeer(beer);
    res.status(200).send(data);
  }

  async deleteBeerById(req, res) {
    const id = req.params.id;
    const result = await beersService.deleteBeer(id);
    res.status(200).send({ deleted: result });
  }
}

module.exports = new BeersController();
