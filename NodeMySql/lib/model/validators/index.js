const Joi = require('joi');

const beerId = {
  id: Joi.string().required(),
};

const insertBeer = {
  name: Joi.string().required(),
  style: Joi.string().required(),
  abv: Joi.number().required(),
  ibu: Joi.number().required(),
  description: Joi.string().optional(),
};

module.exports = {
  beerId,
  insertBeer,
};
