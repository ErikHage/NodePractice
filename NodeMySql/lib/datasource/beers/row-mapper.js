const fromRow = (row) =>  {
  console.log('row in fromRow');
  console.log(row);

  const obj = {
    id: row.id,
    name: row.name,
    style: row.style,
    abv: row.abv,
    ibu: row.ibu,
  };

  const buffer = new Buffer( row.description, 'binary');

  return Object.assign(obj, { description: buffer.toString('utf8') });
};

module.exports = {
  fromRow,
};