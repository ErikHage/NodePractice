const Joi = require('joi');

const beerId = {
  id: Joi.string().required(),
};

module.exports = {
  beerId,
};
