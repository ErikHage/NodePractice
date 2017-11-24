const mysql = require('mysql');

const connection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'ehage',
    password: 'ASdot786!',
    database: 'beers',
  });
};

class Database {
  static execQuery(sql, params) {
    return new Promise((resolve, reject) => {
      const conn = connection();

      conn.connect();

      conn.query(sql, params, (err, results, fields) => {
        if (err) {
          reject(new Error('Error during execQuery', err));
        }

        resolve({
          results: results,
          fields: fields,
        });
      });

      conn.end();
    });
  }
}

module.exports = Database;
