'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  beerId: Joi.number().integer().optional(),
  name: Joi.string().required(),
  style: Joi.string().required(),
  abv: Joi.number().required(),
  ibu: Joi.number().required(),
  description: Joi.string().optional(),
});