const Promise = require('bluebird');
const BeersDataSource = require('../../datasource/beer');

class BeerService {

  createBeer(beer) {
    console.log(`In BeerService.createBeer: ${JSON.stringify(beer)}`);
    return Promise.coroutine(function* insertBeer() {
      return yield BeersDataSource.insertBeer(beer)
        .catch((err) => console.log(`Error inserting beer: ${err.message}`));
    })();
  }

  getBeerById(beerId) {
    console.log(`Getting beer: ${beerId}`);
    return Promise.coroutine(function* getBeerById() {
      return yield BeersDataSource.getBeerById(beerId)
        .catch((err) => console.log(`Error reading beer: ${err.message}`));
    })();
  }

  updateBeer(beer) {
    console.log(`Updating Beer: ${JSON.stringify(beer)}`);
    return Promise.coroutine(function* updateBeer() {
      return yield BeersDataSource.updateBeer(beer)
        .catch((err) => console.log(`Error updating beer: ${err.message}`));
    })();
  }

  deleteBeer(beerId) {
    console.log(`Deleting beer: ${beerId}`);
    return Promise.coroutine(function* deleteBeer() {
      return yield BeersDataSource.deleteBeer(beerId)
        .catch((err) => console.log(`Error deleting beer: ${err.message}`));
    })();
  }

}

module.exports = BeerService;