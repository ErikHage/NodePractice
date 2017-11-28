const Promise = require('bluebird');
const BeersDataSource = require('../../datasource/beers');

class BeersService {
  static createBeer(beer) {
    return Promise.coroutine(function* createBeer() {
      return yield BeersDataSource.insertBeer(beer)
        .catch((err) => new Error('Error creating beer', err));
    })();
  }

  static getBeerById(id) {
    return Promise.coroutine(function* getBeerById() {
      return yield BeersDataSource.readBeerById(id)
        .catch((err) => new Error(`Error getting beer with id: ${id}`, err));
    })();
  }
}

module.exports = BeersService;
