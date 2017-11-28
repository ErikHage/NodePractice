const mysql = require('mysql');
const constants = require('../helper/constants');

const connection = () =>
  mysql.createConnection({
    host: constants.host,
    user: constants.user,
    password: constants.password,
    database: constants.database,
  });

class Database {
  static execQuery(sql, params) {
    return new Promise((resolve, reject) => {
      const conn = connection();

      conn.connect();

      conn.query(sql, params, (err, results) => {
        console.log(err);
        if (err) {
          reject(new Error('Error during execQuery', err));
        }
        console.log(results);
        resolve(results);
      });

      conn.end();
    });
  }
}

module.exports = Database;
