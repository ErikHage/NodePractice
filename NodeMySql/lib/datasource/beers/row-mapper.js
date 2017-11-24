const fromRow = (row) => {
  const obj = {
    id: row.id,
    name: row.name,
    style: row.style,
    abv: row.abv,
    ibu: row.ibu,
  };

  const buffer = Buffer.from(row.description, 'binary');

  return Object.assign(obj, { description: buffer.toString('utf8') });
};

module.exports = {
  fromRow,
};
