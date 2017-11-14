const loki = require('lokijs');
const Promise = require('bluebird');


const db = new loki('beers.db');
const beers = db.getCollection("beers") === null ? db.addCollection("beers") : db.getCollection("beers");

class BeersDataSource {

  static insertBeer(beer) {
    console.log(`Inserting new beer record: ${JSON.stringify(beer)}`);
    let result;

    try {
      result = beers.insert(beer);
    } catch (err) {
      return Promise.reject(new Error(`Insert failed wih error: ${JSON.stringify(err)}`));
    }

    if(result !== null) {
      console.log(`Successfully inserted new beer record: ${JSON.stringify(result)}`);
      //console.log(`Current size of beers collection is ${beers.find().length}`);
      return Promise.resolve(result);
    } else {
      return Promise.reject(new Error('Insert failed with unknown error'));
    }
  }

  static getBeerById(beerId) {
    console.log(`Getting beer with id: ${beerId}`);
    let result;

    try {
      result = beers.findOne({ beerId: beerId });
    } catch (err) {
      return Promise.reject(new Error(`Read failed wih error: ${JSON.stringify(err)}`));
    }

    if(result !== null) {
      console.log(`Successfully read beer record: ${JSON.stringify(result)}`);
      return Promise.resolve(result);
    } else {
      return Promise.reject(new Error('Read failed with unknown error'));
    }
  }

  static updateBeer(beer) {
    console.log(`Updating beer with id: ${beer.beerId}`);
    let result;

    try {
      result = beers.findAndUpdate({ beerId: beer.beerId }, (data) => {
        for (let key in beer){
          if (beer.hasOwnProperty(key)) {
            data[key] = beer[key];
          }
        }
      });
    } catch (err) {
      return Promise.reject(new Error(`Update failed wih error: ${JSON.stringify(err)}`));
    }

    if(result !== null) {
      return Promise.resolve(result);
    } else {
      return Promise.reject(new Error('Update failed with unknown error'));
    }
  }

  static deleteBeer(beerId) {
    console.log(`Deleting beer with id: ${beerId}`);

    try {
      beers.findAndRemove({ beerId: beerId });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error(`Delete failed wih error: ${JSON.stringify(err)}`));
    }
  }

}

module.exports = BeersDataSource;