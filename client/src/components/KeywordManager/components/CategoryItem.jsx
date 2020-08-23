import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { find, isFunction, toLower } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import DeleteButton from '../../shared/DeleteButton';
import Tag from '../../shared/Tag';
import InputTag from '../../shared/Tag/InputTag';

/************************************************************
 *   There is a bug if the size of the category item is
 *   not big enough to house the Tag when hovering it, making
 *   the UI bounce, I have a couple of ideas on how to solve this
 *   but didn't implement any solution. Looking forward to
 *   discussing my approach in the next call ;)
 ************************************************************/

const CategoryItem = ({
  id,
  categoryName,
  keywords,
  onNewKeyword,
  onKeywordRemove,
  focus,
  newCategory,
  onFinishEditing,
  onCategoryDelete
}) => {
  const containerRef = useRef();
  const [newTag, setNewTag] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [newTagIsInvalid, setNewTagIsInvalid] = useState(false);
  const [hover, setHover] = useState(false);
  const [localCategoryName, setLocalCategoryName] = useState(categoryName);
  const categoryFinishEditing = () => isFunction(onFinishEditing) && onFinishEditing(localCategoryName);

  const resetNewTag = () => setNewTag(false);

  const generateNewTag = e => {
    if (e.target === containerRef.current && !newTag && !newTag) setNewTag(true);
  };

  const handleNewTagComplete = () => {
    if (!newTagText?.length) return resetNewTag();
    if (!newTagIsInvalid) {
      onNewKeyword(id, newTagText);
      setNewTagText('');
      resetNewTag();
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
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
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
        onFinishEditing={categoryFinishEditing}
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
    </motion.div>
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
  onFinishEditing: PropTypes.func,
  onCategoryDelete: PropTypes.func
};

export default CategoryItem;
