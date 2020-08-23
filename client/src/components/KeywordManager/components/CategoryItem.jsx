import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { find, isFunction, toLower } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useClickAway, useKeyPressEvent } from 'react-use';
import DeleteButton from '../../shared/DeleteButton';
import Tag from '../../shared/Tag';
import InputTag from '../../shared/Tag/InputTag';

const CategoryItem = ({
  id,
  categoryName,
  keywords,
  onNewKeyword,
  onKeywordRemove,
  focus,
  newCategory,
  onComplete,
  onCategoryDelete
}) => {
  const containerRef = useRef();
  const [newTag, setNewTag] = useState(false);
  const [newTagText, setNewTagText] = useState(null);
  const [newTagIsInvalid, setNewTagIsInvalid] = useState(false);
  const [hover, setHover] = useState(false);
  const [localCategoryName, setLocalCategoryName] = useState(categoryName);
  const completeEditing = () => isFunction(onComplete) && onComplete(localCategoryName);
  useClickAway(containerRef, completeEditing);
  useKeyPressEvent('Enter', completeEditing);
  useKeyPressEvent('Tab', completeEditing);

  const generateNewTag = e => {
    if (e.target === containerRef.current && !newTag && newTagText !== '') {
      setNewTag(true);
      setNewTagText('');
    } else {
      setNewTagText(null);
    }
  };

  const handleNewTagComplete = type => {
    if (!newTagText?.length) return setNewTag(false);
    if (!newTagIsInvalid) {
      onNewKeyword(id, newTagText);
      setNewTagText(null);
      setNewTag(false);
    }
  };

  const handleNewTagChange = value => {
    const equalKeyword = find(keywords, el => toLower(el) === toLower(value));
    if (equalKeyword) {
      setNewTagIsInvalid(true);
    } else if (newTagIsInvalid) {
      setNewTagIsInvalid(false);
    }

    setNewTagText(value);
  };

  return (
    <div
      ref={containerRef}
      className={classNames(
        'w-auto relative rounded-md flex flex-wrap items-center justify-start overflow-visible p-2 pb-1 border-2 border-transparent hover:border-gray-300 hover:border-opacity-75 cursor-pointer',
        newCategory ? 'border-gray-300 border-opacity-75' : ''
      )}
      onClick={generateNewTag}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {newCategory && (
        <div style={{ top: -26 }} className='absolute tetx-lg font-extrabold border-b-2 border-smetrics'>
          NEW CATEGORY
        </div>
      )}
      <InputTag
        focus={focus || newCategory}
        value={localCategoryName}
        onChange={setLocalCategoryName}
        className='bg-smetrics mr-2 mb-1'
        onFinishEditing={handleNewTagComplete}
      />
      {keywords?.length > 0 &&
        keywords.map((tag, i) => (
          <Tag
            removable
            key={i}
            value={tag}
            className='bg-black h-7 mr-2 mb-1'
            onTagRemove={value => onKeywordRemove(id, value)}
          />
        ))}
      <AnimatePresence>
        {newTag && !newCategory && (
          <InputTag
            focus
            value={newTagText}
            error={newTagIsInvalid}
            onChange={handleNewTagChange}
            className='bg-black mr-2 mb-1'
            onFinishEditing={handleNewTagComplete}
          />
        )}
      </AnimatePresence>

      <DeleteButton className='absolute' visible={hover} style={{ right: -16, top: -16 }} onClick={() => onCategoryDelete(id)} />
    </div>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  keywords: PropTypes.array,
  onNewKeyword: PropTypes.func,
  onKeywordRemove: PropTypes.func,
  focus: PropTypes.bool,
  newCategory: PropTypes.bool,
  onComplete: PropTypes.func,
  onCategoryDelete: PropTypes.func
};

export default CategoryItem;
