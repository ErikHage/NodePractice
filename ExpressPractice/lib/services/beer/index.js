const constants = require('../../helpers/constants');
const beersMap = require('../../testData/beers');
const Promise = require('bluebird');

class BeerService {

  static createBeer(beer) {
    console.log('In BeerService.createBeer');
    return Promise.coroutine(function* createBeer() {
      try {
        console.log(`Beer created: ${beer}`);
        return Promise.resolve(beer);
      } catch(err) {
        return Promise.reject(`Error saving beer ${beer}`);
      }
    });
  }

  static getBeer(beerId) {
    console.log(`Getting beer: ${beerId}`);
    if(beersMap.has(beerId)) {
      return {};
    } else {
      return beersMap.get();
    }
  }

  static updateBeer(beer) {
    console.log(`Beer updated: ${beer}`);
  }

  static deleteBeer(beerId) {
    console.log(`Deleting beer: ${beerId}`);
  }

}

module.exports = BeerService;