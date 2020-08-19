import { useSubscription } from '@apollo/client';
import React from 'react';
import TextInput from '../shared/TextInput';
import { GET_CATEGORIES } from './KeywordManager.graphql';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);

  if (!data) return null;

  const handleCategoryNameChange = (id, name) => {
    console.log(id, name);
  };

  return (
    <div>
      {data.categories.map(({ id, name, keywords }) => (
        <TextInput key={id} value={name} onChange={newName => handleCategoryNameChange(id, newName)} />
      ))}
    </div>
  );
};

export default KeywordManager;
