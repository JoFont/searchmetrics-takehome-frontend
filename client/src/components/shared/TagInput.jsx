import React from 'react';
import Tag from './Tag';
import PropTypes from 'prop-types';

const TagInput = ({ tags, tagClassName }) => {
  return (
    <div className='flex space-x-2 items-center'>
      {tags?.length && tags.map((tag, i) => <Tag key={i} value={tag} className={tagClassName} />)}
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.array,
  tagClassName: PropTypes.string
};

export default TagInput;
