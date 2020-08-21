const { GraphQLServer, PubSub } = require('graphql-yoga');
const { findIndex, difference, isInteger } = require('lodash');
const { v4: uuidv4 } = require('uuid');

const categories = [
  { id: 'swdfwdfsdf', name: 'Category 1', keywords: ['cat', 'dog', 'cenas'] },
  { id: 'ohmfnmnfk', name: 'Category 2', keywords: ['teste', 'teste 2'] }
];

const typeDefs = `
  type Category {
    id: ID!
    name: String!
    keywords: [String!]
  }

  type Query {
    categories: [Category!]
  }

  type Mutation {
    addCategory(name: String!, keywords: [String!]): ID!
    addKeyword(id: ID!, keyword: String!): ID!
    deleteKeyword(id: ID!, keyword: String!): ID!
  }

  type Subscription {
    categories: [Category!]
  }
`;

const subscribers = [];
const onCategoryUpdates = fn => subscribers.push(fn);

const resolvers = {
  Query: {
    categories: () => categories
  },
  Mutation: {
    addCategory: (_, { name, keywords }) => {
      const id = uuidv4;
      categories.push({
        id,
        name,
        keywords
      });
      subscribers.forEach(fn => fn());
      return id;
    },

    addKeyword: (_, { id, keyword }) => {
      const categoryIndex = findIndex(categories, { id });
      if (isInteger(categoryIndex)) {
        categories[categoryIndex].keywords.push(keyword);
      }
      subscribers.forEach(fn => fn());
      return id;
    },

    deleteKeyword: (_, { id, keyword }) => {
      const categoryIndex = findIndex(categories, { id });
      console.log('asefswef', categoryIndex, id, keyword);

      if (isInteger(categoryIndex)) {
        const newKeywords = difference([...categories[categoryIndex].keywords], [keyword]);
        categories[categoryIndex].keywords = newKeywords;
      }
      subscribers.forEach(fn => fn());
      return id;
    }
  },
  Subscription: {
    categories: {
      subscribe: (_, __, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onCategoryUpdates(() => pubsub.publish(channel, { categories }));
        setTimeout(() => pubsub.publish(channel, { categories }), 0);
        return pubsub.asyncIterator(channel);
      }
    }
  }
};

const pubsub = new PubSub();
const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/pubsub',
  playground: '/playground'
};
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(options, ({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
