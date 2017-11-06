const celebrate = require('celebrate');

const joiOptions = {
  presence: 'required',
  stripUnknown: true,
};

class Constraints {

  static validateInputs(schemaMap) {
    return celebrate(schemaMap, joiOptions);
  }

  static validateBody(schemaObj) {
    return Constraints.validateInputs({
      body: schemaObj,
    });
  }

}

module.exports = Constraints;