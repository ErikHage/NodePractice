const graphql = require('express-graphql');
const schema = require('../schemas');

const faqService = require('../services/faqs');

const root = {
  faq: faqService.getById,
  faqs: faqService.getAll,
};

module.exports = graphql({
  schema: schema,
  rootValue: root,
  graphiql: true,
});
