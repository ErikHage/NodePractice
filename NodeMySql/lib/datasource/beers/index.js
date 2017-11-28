const Database = require('../../database');
const rowMapper = require('./row-mapper');

class BeersDataSource {
  static insertBeer(beer) {
    const insertBeerQuery =
      'INSERT INTO beers (name, style, abv, ibu, description)' +
      'VALUES (?,?,?,?,?)';

    return Database.execQuery(insertBeerQuery, [beer.name, beer.style, beer.abv,
      beer.ibu, beer.description])
      .then((results) => {
        const row = results[0];
        return rowMapper.fromRow(row);
      })
      .catch((err) => new Error('Error inserting beer', err));
  }

  static readBeerById(id) {
    const getByIdQuery = 'SELECT * FROM beers.beers WHERE id = ?';

    return Database.execQuery(getByIdQuery, [id])
      .then((results) => {
        if (results.length < 1) {
          throw new Error('No results returned');
        }

        const row = results[0];
        return rowMapper.fromRow(row);
      })
      .catch((err) => new Error(`Error getting beer with id: ${id}`, err));
  }
}

module.exports = BeersDataSource;
