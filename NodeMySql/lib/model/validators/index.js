const Joi = require('joi');

const beerId = {
  id: Joi.number().required(),
};

const insertBeer = {
  name: Joi.string().required(),
  style: Joi.string().required(),
  abv: Joi.number().required(),
  ibu: Joi.number().required(),
  description: Joi.string().optional(),
};

const updateBeer = {
  id: Joi.number().required(),
  name: Joi.string().required(),
  style: Joi.string().required(),
  abv: Joi.number().required(),
  ibu: Joi.number().required(),
  description: Joi.string().optional(),
};

module.exports = {
  beerId,
  insertBeer,
  updateBeer,
};
