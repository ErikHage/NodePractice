const Promise = require('bluebird');
const BeersDataSource = require('../../datasource/beers');

class BeersService {
  static getBeerById(id) {
    return Promise.coroutine(function* getBeerById() {
      return yield BeersDataSource.getBeerById(id)
        .catch((err) => new Error(`Error getting beer with id: ${id}`, err));
    })();
  }
}

module.exports = BeersService;
