import { useSubscription } from '@apollo/client';
import React from 'react';
import { GET_CATEGORIES } from './KeywordManager.graphql';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);

  if (!data) return null;

  return (
    <div>
      {data.categories.map(({ id, name, keywords }) => (
        <p key={id}>{name}</p>
      ))}
    </div>
  );
};

export default KeywordManager;
