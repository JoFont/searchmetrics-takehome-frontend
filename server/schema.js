module.exports = `
  type Category {
    id: ID!
    name: String!
    keywords: [String!]
  }

  type Query {
    categories: [Category!]
  }

  type Mutation {
    addCategory(name: String!): ID!
    renameCategory(id: ID!, name: String!): ID!
    deleteCategory(id: ID!): ID!
    addKeyword(id: ID!, keyword: String!): ID!
    deleteKeyword(id: ID!, keyword: String!): ID!
  }

  type Subscription {
    categories: [Category!]
  }
`;
