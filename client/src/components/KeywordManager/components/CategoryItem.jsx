import classNames from 'classnames';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Tag from '../../shared/Tag';
import TextInput from '../../shared/TextInput';

const CategoryItem = ({ categoryName, keywords }) => {
  const containerRef = useRef();
  const [newTag, setNewTag] = useState(false);
  const [newTagText, setNewTagText] = useState(null);

  const generateNewTag = e => {
    if (e.target === containerRef.current && !newTag && newTagText !== "") {
      setNewTag(true);
      setNewTagText("")
    } else {
       setNewTagText(null)
    }
  };

  const handleNewTagComplete = value => {
    if (!value?.length) {
       setNewTag(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={classNames(
        'w-full rounded-md flex flex-wrap items-center justify-start overflow-hidden p-1 border-2 border-red cursor-pointer'
      )}
      onClick={generateNewTag}>
      <div className='px-3 bg-smetrics rounded mr-2 mb-1'>
        <TextInput value={categoryName} className='bg-transparent text-white h-full' />
      </div>
      {keywords?.length && keywords.map((tag, i) => <Tag key={i} value={tag} className='bg-black h-7 mr-2 mb-1' />)}
      {newTag && (
        <Tag
          value={newTagText}
          onChange={setNewTagText}
          className='bg-black h-7 mr-2 mb-1'
          autoFocus
          onComplete={handleNewTagComplete}
        />
      )}
    </div>
  );
};

CategoryItem.propTypes = {
  categoryName: PropTypes.string.isRequired,
  keywords: PropTypes.array
};

export default CategoryItem;
