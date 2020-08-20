import { useSubscription } from '@apollo/client';
import React from 'react';
import CategoryItem from './components/CategoryItem';
import { GET_CATEGORIES } from './KeywordManager.graphql';
import PropTypes from 'prop-types';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);

  if (!data) return null;

  const handleCategoryNameChange = (id, name) => {
    console.log(id, name);
  };

  return (
    <div className='flex flex-col space-y-2'>
      {data.categories.map(({ id, name, keywords }) => (
        <CategoryItem key={id} categoryName={name} keywords={keywords} />
      ))}
    </div>
  );
};

KeywordManager.propTypes = {};

export default KeywordManager;
