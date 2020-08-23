import { useMutation, useSubscription } from '@apollo/client';
import { noop } from 'lodash';
import React, { useState } from 'react';
import ActionButton from '../shared/ActionButton';
import Empty from '../shared/Empty';
import CategoryItem from './components/CategoryItem';
import Loading from './components/Loading';
import {
  ADD_CATEGORY,
  ADD_KEYWORD,
  DELETE_CATEGORY,
  DELETE_KEYWORD,
  GET_CATEGORIES,
  RENAME_CATEGORY
} from './KeywordManager.graphql';

const KeywordManager = () => {
  const { data } = useSubscription(GET_CATEGORIES);
  const [addCategory, { loading: addCategoryLoading }] = useMutation(ADD_CATEGORY);
  const [renameCategory] = useMutation(RENAME_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [addKeyword] = useMutation(ADD_KEYWORD);
  const [deleteKeyword] = useMutation(DELETE_KEYWORD);
  const [newCategory, setNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  if (!data) return null;

  const addNewCategory = name => {
    if (!!name) addCategory({ variables: { name } });
    setNewCategory(false);
    setNewCategoryName('');
  };

  const renameExistingCategory = (id, name) => {
    if (name?.length && id) renameCategory({ variables: { id, name } });
  };

  const deleteExistingCategory = id => {
    deleteCategory({ variables: { id } });
  };

  const addNewKeyword = (id, value) => {
    addKeyword({ variables: { id, keyword: value } });
  };

  const removeOldKeyword = (id, value) => {
    deleteKeyword({ variables: { id, keyword: value } });
  };

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex justify-end items-center pb-2'>
        <ActionButton onClick={() => setNewCategory(true)}>ADD CATEGORY</ActionButton>
      </div>
      {addCategoryLoading && <Loading />}
      {newCategory && (
        <CategoryItem
          focus
          newCategory
          key={'new_keyword'}
          id={'new_keyword'}
          categoryName={newCategoryName}
          keywords={[]}
          onNewKeyword={noop}
          onKeywordRemove={noop}
          onFinishEditing={addNewCategory}
          onCategoryDelete={() => addNewCategory('')}
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
          onCategoryDelete={deleteExistingCategory}
          onFinishEditing={newName => renameExistingCategory(id, newName)}
        />
      ))}
      {!data?.categories?.length && !newCategory && !addCategoryLoading && (
        <div className='w-full flex justify-center items-center mt-0'>
          <Empty title='No categories yet!' subTitle='Click above to add one.' />
        </div>
      )}
    </div>
  );
};

export default KeywordManager;
