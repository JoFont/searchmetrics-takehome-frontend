const { GraphQLServer, PubSub } = require('graphql-yoga');
const { v4: uuidv4 } = require('uuid');

const categories = [
  { id: '1', name: 'Category 1', keywords: ['cat', 'dog', 'cenas'] },
  { id: '2', name: 'Category 2', keywords: ['teste', 'teste 2'] }
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
