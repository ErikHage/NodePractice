const Database = require('../../database');
const rowMapper = require('./row-mapper');

class BeersDataSource {
  static getBeerById(id) {
    const getByIdQuery = 'SELECT * FROM beers WHERE id = ?';

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
