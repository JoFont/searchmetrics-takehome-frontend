import classNames from 'classnames';
import { find, toLower } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import Tag from '../../shared/Tag';
import TextInput from '../../shared/TextInput';
import DeleteButton from '../../shared/DeleteButton';

const { InputTag } = Tag;

const CategoryItem = ({ id, categoryName, keywords, onNewKeyword, onKeywordRemove }) => {
  const containerRef = useRef();
  const [newTag, setNewTag] = useState(false);
  const [newTagText, setNewTagText] = useState(null);
  const [newTagIsInvalid, setNewTagIsInvalid] = useState(false);
  const [hover, setHover] = useState(false);

  const generateNewTag = e => {
    if (e.target === containerRef.current && !newTag && newTagText !== '') {
      setNewTag(true);
      setNewTagText('');
    } else {
      setNewTagText(null);
    }
  };

  useEffect(() => {
    console.dir(containerRef.current);
  }, [containerRef]);

  const handleNewTagComplete = value => {
    console.log(value);
    if (!value?.length) return setNewTag(false);
    if (!newTagIsInvalid) {
      onNewKeyword(id, value);
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
        'w-auto relative rounded-md flex flex-wrap items-center justify-start overflow-visible p-2 pb-1 border-2 border-transparent hover:border-gray-300 hover:border-opacity-75 cursor-pointer'
      )}
      onClick={generateNewTag}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className='px-3 pb-1 bg-smetrics rounded-md mr-2 mb-1'>
        <TextInput value={categoryName} className='bg-transparent text-white h-full' />
      </div>
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
      {newTag && (
        <InputTag
          value={newTagText}
          error={newTagIsInvalid}
          onChange={handleNewTagChange}
          className='bg-black mr-2 mb-1'
          onFinishEditing={handleNewTagComplete}
        />
      )}
      <DeleteButton className='absolute' visible={hover} style={{ right: -16, top: -16 }} />
    </div>
  );
};

CategoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  keywords: PropTypes.array,
  onNewKeyword: PropTypes.func
};

export default CategoryItem;
