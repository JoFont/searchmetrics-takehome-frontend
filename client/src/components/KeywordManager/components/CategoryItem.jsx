import classNames from 'classnames';
import React from 'react';
import TagInput from '../../shared/TagInput';
import TextInput from '../../shared/TextInput';
import PropTypes from 'prop-types';

const CategoryItem = ({ categoryName, keywords }) => {
  return (
    <div className={classNames('w-full rounded-md flex items-center overflow-hidden shadow-sm')}>
      <div className='h-full px-3 bg-smetrics'>
        <TextInput value={categoryName} className='bg-transparent text-white' />
      </div>
      <div className='h-full px-3'>
        <TagInput tags={keywords} tagClassName={'bg-black'} />
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  keywords: PropTypes.array
};

export default CategoryItem;
