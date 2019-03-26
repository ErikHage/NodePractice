const connFactory = require('./mysql-connection');

const execQuery = (sql, params) =>
  new Promise((resolve, reject) => {
    const conn = connFactory.getConnection();
    conn.connect();

    conn.query(sql, params, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });

    conn.end();
  });

module.exports = {
  execQuery,
};
