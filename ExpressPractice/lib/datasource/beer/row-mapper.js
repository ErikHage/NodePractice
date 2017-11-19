const fromRow = (row) => ({
  beerId: row.beerId,
  name: row.name,
  style: row.style,
  abv: row.abv,
  ibu: row.ibu,
  description: row.description,
});

module.exports = {
  fromRow,
};