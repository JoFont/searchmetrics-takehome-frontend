import { useSubscription, useMutation } from '@apollo/client';
import React from 'react';
import CategoryItem from './components/CategoryItem';
import { GET_CATEGORIES, ADD_KEYWORD, DELETE_KEYWORD } from './KeywordManager.graphql';
import PropTypes from 'prop-types';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);
  const [addKeyword] = useMutation(ADD_KEYWORD);
  const [deleteKeyword] = useMutation(DELETE_KEYWORD);

  if (!data) return null;

  const handleCategoryNameChange = (id, name) => {
    console.log(id, name);
  };

  const addNewKeyword = (id, value) => {
    addKeyword({
      variables: {
        id,
        keyword: value
      }
    });
  };

  const removeOldKeyword = (id, value) => {
    deleteKeyword({
      variables: {
        id,
        keyword: value
      }
    });
  };

  console.log(data);

  return (
    <div className='flex flex-col space-y-2'>
      {data.categories.map(({ id, name, keywords }) => (
        <CategoryItem
          key={id}
          id={id}
          categoryName={name}
          keywords={keywords}
          onNewKeyword={addNewKeyword}
          onKeywordRemove={removeOldKeyword}
        />
      ))}
    </div>
  );
};

KeywordManager.propTypes = {};

export default KeywordManager;
