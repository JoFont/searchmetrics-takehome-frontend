import { useSubscription } from '@apollo/client';
import React from 'react';
import TextInput from '../shared/TextInput';
import CategoryItem from './components/CategoryItem';
import { GET_CATEGORIES } from './KeywordManager.graphql';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);

  if (!data) return null;

  const handleCategoryNameChange = (id, name) => {
    console.log(id, name);
  };

  return (
    <div className='flex flex-col space-y-2'>
      {data.categories.map(({ id, name, keywords }) => (
        <CategoryItem key={id} categoryName={name} />
      ))}
    </div>
  );
};

export default KeywordManager;
