import { useMutation, useSubscription } from '@apollo/client';
import { noop } from 'lodash';
import React, { useState } from 'react';
import ActionButton from '../shared/ActionButton';
import CategoryItem from './components/CategoryItem';
import { ADD_CATEGORY, ADD_KEYWORD, DELETE_KEYWORD, GET_CATEGORIES } from './KeywordManager.graphql';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);
  const [addCategory] = useMutation(ADD_CATEGORY);
  const [addKeyword] = useMutation(ADD_KEYWORD);
  const [deleteKeyword] = useMutation(DELETE_KEYWORD);
  const [newCategory, setNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  if (!data) return null;

  const handleCategoryNameChange = (id, name) => {
    console.log(id, name);
  };

  const addNewCategory = name => {
    if (!!name) {
      addCategory({
        variables: {
          name
        }
      });
      setNewCategory(false);
      setNewCategoryName('');
    }
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

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex justify-end items-center pb-2'>
        <ActionButton onClick={() => setNewCategory(true)}>ADD CATEGORY</ActionButton>
      </div>
      {newCategory && (
        <CategoryItem
          focus
          key={'new_keyword'}
          id={'new_keyword'}
          categoryName={newCategoryName}
          keywords={[]}
          onNewKeyword={noop}
          onKeywordRemove={noop}
          onClickAway={addNewCategory}
          onCategoryNameChange={val => setNewCategoryName(val)}
        />
      )}
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
