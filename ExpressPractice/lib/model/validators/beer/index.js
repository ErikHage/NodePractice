'use strict';

const Joi = require('joi');

exports.insert = {
  name: Joi.string().required(),
  style: Joi.string().required(),
  abv: Joi.number().required(),
  ibu: Joi.number().required(),
  description: Joi.string().optional(),
};

exports.update = {
  beerId: Joi.string().required(),
  name: Joi.string().required(),
  style: Joi.string().required(),
  abv: Joi.number().required(),
  ibu: Joi.number().required(),
  description: Joi.string().optional(),
};

exports.id = {
  beerId: Joi.string().required(),
};
