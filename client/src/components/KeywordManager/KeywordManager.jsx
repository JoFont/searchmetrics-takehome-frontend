import { useSubscription } from '@apollo/client';
import React from 'react';
import { GET_CATEGORIES } from './KeywordManager.graphql';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);

  console.log('DATA', data);

  if (!data) return null;

  return (
    <div>
      Yo
      {data.categories.map(({ id, name, keywords }) => (
        <p key={id}>{name}</p>
      ))}
    </div>
  );
};

export default KeywordManager;
