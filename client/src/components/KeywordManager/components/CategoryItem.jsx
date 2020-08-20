import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../../shared/Tag';
import TextInput from '../../shared/TextInput';

const CategoryItem = ({ categoryName, keywords }) => {
  return (
    <div
      className={classNames(
        'w-full rounded-md flex flex-wrap items-center justify-start overflow-hidden p-1 border-2 border-red'
      )}>
      <div className='px-3 bg-smetrics rounded mr-2 mb-1'>
        <TextInput value={categoryName} className='bg-transparent text-white h-full' />
      </div>
      {keywords?.length && keywords.map((tag, i) => <Tag key={i} value={tag} className='bg-black h-7 mr-2 mb-1' />)}
    </div>
  );
};

CategoryItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  keywords: PropTypes.array
};

export default CategoryItem;
