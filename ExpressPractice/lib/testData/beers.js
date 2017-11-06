const map = new Map();

map.set(1, {
  beerId: 1,
  name: 'Checks and Balances',
  style: 'IPA',
  abv: 4.5,
  ibu: 32.0,
  description: 'Balanced hoppy and malty IPA',
});

map.set(2, {
  beerId: 2,
  name: 'Rosie\'s Red Ale',
  style: 'Amber',
  abv: 5.5,
  ibu: 22.0,
  description: 'some description',
});

module.exports = map;