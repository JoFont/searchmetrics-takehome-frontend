const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

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
