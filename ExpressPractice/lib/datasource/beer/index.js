'use strict';

const rowMapper = require('./row-mapper');
const Database = require('../../database');

const beersCollection = 'beers';

class BeersDataSource {

  static insertBeer(beer) {
    return Database.insert(beer, beersCollection)
      .then((row) => rowMapper.fromRow(row));
  }

  static getBeerById(beerId) {
    return Database.findOne({ beerId: beerId }, beersCollection)
      .then((row) => rowMapper.fromRow(row));
  }

  static updateBeer(beer) {
    return Database.update({ beerId: beer.beerId }, beer, beersCollection)
      .then((row) => rowMapper.fromRow(row));
  }

  static deleteBeer(beerId) {
    return Database.remove({ beerId: beerId }, beersCollection);
  }
}

module.exports = BeersDataSource;
