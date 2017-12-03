const beersDataSource = require('../../datasource/beers');

class BeersService {
  async createBeer(beer) {
    return await beersDataSource.insertBeer(beer);
  }

  async getBeerById(id) {
    return await beersDataSource.readBeerById(id);
  }

  async updateBeer(beer) {
    return await beersDataSource.updateBeer(beer);
  }

  async deleteBeer(id) {
    return await beersDataSource.deleteBeer(id);
  }
}

module.exports = new BeersService();
