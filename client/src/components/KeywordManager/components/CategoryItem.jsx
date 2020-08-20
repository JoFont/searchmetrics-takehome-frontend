import React from 'react';
import TextInput from '../../shared/TextInput';
import classNames from 'classnames';

const CategoryItem = ({ categoryName, keywords }) => {
  return (
    <div className={classNames('w-full rounded-md flex overflow-hidden shadow-sm')}>
      <div className='h-full px-3 bg-smetrics'>
        <TextInput value={categoryName} className='bg-transparent text-white' />
      </div>
      <div className='h-full px-3'></div>
    </div>
  );
};

export default CategoryItem;
