import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from '../api';
import Header from '../components/Header';
import Card from '../components/shared/Card';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-3/5 flex flex-col items-center justify-center'>
          <Header />
          <Card>Hello World</Card>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
