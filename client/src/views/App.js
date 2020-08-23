import { ApolloProvider } from '@apollo/client';
import React from 'react';
import FadeIn from 'react-fade-in';
import client from '../api';
import Header from '../components/Header';
import KeywordManager from '../components/KeywordManager/KeywordManager.jsx';
import Card from '../components/shared/Card';
import Hero from '../components/shared/Hero';

/************************************************************
 *    The component is placed in then middle of the page
 *    and will overflow vertically if enough components
 *    are added, I decided to still keep it this way for 
 *    presentation purposes.
 ************************************************************/


const App = () => {
  return (
    <ApolloProvider client={client}>
      <FadeIn className='w-screen h-screen flex items-center justify-center overflow-hidden' childClassName='w-full h-full'>
        <Hero>
          <FadeIn className='w-3/5 flex flex-col items-center justify-center space-y-8 z-20' childClassName='w-full h-full'>
            <Header />
            <Card>
              <KeywordManager />
            </Card>
          </FadeIn>
        </Hero>
      </FadeIn>
    </ApolloProvider>
  );
};

export default App;
