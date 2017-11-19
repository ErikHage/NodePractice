const Promise = require('bluebird');
const BeersDataSource = require('../../datasource/beer');

class BeerService {

  static createBeer(beer) {
    return Promise.coroutine(function* insertBeer() {
      return yield BeersDataSource.insertBeer(beer)
        .catch((err) => {
          throw new Error(`Error inserting beer: ${err.message}`, err);
        });
    })();
  }

  static getBeerById(beerId) {
    return Promise.coroutine(function* getBeerById() {
      return yield BeersDataSource.getBeerById(beerId)
        .catch((err) => {
          throw new Error(`Error reading beer: ${err.message}`, err);
        });
    })();
  }

  static updateBeer(beer) {
    return Promise.coroutine(function* updateBeer() {
      return yield BeersDataSource.updateBeer(beer)
        .catch((err) => {
          throw new Error(`Error updating beer: ${err.message}`, err);
        });
    })();
  }

  static deleteBeer(beerId) {
    return Promise.coroutine(function* deleteBeer() {
      return yield BeersDataSource.deleteBeer(beerId)
        .catch((err) => {
          throw new Error(`Error deleting beer: ${err.message}`, err);
        });
    })();
  }
}

module.exports = BeerService;