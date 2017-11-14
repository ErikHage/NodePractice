const Joi = require('joi');

module.exports = {
  statusCodes : {
    ok: 200,
    created: 201,
    noContent: 204,
    found: 302,
    badRequest: 400,
    unauthorized: 403,
    notFound: 404,
    serverError: 500,
  },
  httpMethods: {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
  },

};