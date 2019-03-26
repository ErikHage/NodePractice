const db = require('../../database');

const fromRow = (row) => ({
  id: row.id,
  priority: row.priority,
  question: row.question,
  answer: row.answer,
});

const getById = async (args) => {
  const { id } = args;
  const query = 'SELECT * FROM faqs WHERE id = ?';
  const params = [id];

  const results = await db.execQuery(query, params);

  if (results.length < 1) {
    throw new Error('Invalid id');
  }

  return fromRow(results[0]);
};

const getAll = async (args) => {
  const query = 'SELECT * FROM faqs';
  const params = [];

  const results = await db.execQuery(query, params);

  return results.map(fromRow);
};

module.exports = {
  getById,
  getAll,
};
