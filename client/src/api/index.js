import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const link = new WebSocketLink({
  uri: `ws://localhost:4000/pubsub`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default client;
