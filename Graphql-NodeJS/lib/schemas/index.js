const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type FAQ {
    id: Int
    priority: Int
    question: String
    answer: String
  }
  
  type Query {
    faq(id: Int!): FAQ
    faqs: [FAQ]
  }
`);
