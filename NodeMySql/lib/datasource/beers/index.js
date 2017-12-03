const Database = require('../../database');
const rowMapper = require('./row-mapper');

class BeersDataSource {
  async insertBeer(beer) {
    const insertBeerQuery =
      'INSERT INTO beers (name, style, abv, ibu, description)' +
      'VALUES (?,?,?,?,?)';
    const params = [beer.name, beer.style, beer.abv, beer.ibu, beer.description];
    const results = await Database.execQuery(insertBeerQuery, params);

    if (results.affectedRows < 1) {
      throw new Error('Error inserting beer, check mysql logs');
    }

    return Object.assign(beer, { id: results.insertId })
  }

  async readBeerById(id) {
    const getByIdQuery = 'SELECT * FROM beers WHERE id = ?';

    const results = await Database.execQuery(getByIdQuery, [id]);

    if (results.length < 1) {
      throw new Error('No results returned');
    }

    const row = results[0];

    return rowMapper.fromRow(row);
  }

  async updateBeer(beer) {
    const updateBeerQuery = "UPDATE beers SET name = ?, style = ?, abv = ?, ibu = ?, " +
      "description = ? WHERE id = ?";
    const params = [beer.name, beer.style, beer.abv, beer.ibu, beer.description, beer.id];

    const results = await Database.execQuery(updateBeerQuery, params);

    if (results.affectedRows < 1) {
      throw new Error('Error updating beer, check mysql logs');
    }

    return beer;
  }

  async deleteBeer(id) {
    const deleteBeerQuery = "DELETE FROM beers WHERE id = ?";
    const results = await Database.execQuery(deleteBeerQuery, [id]);

    if (results.affectedRows < 1) {
      throw new Error('Error deleting beer, check mysql logs');
    }

    return true;
  }
}

module.exports = new BeersDataSource();
