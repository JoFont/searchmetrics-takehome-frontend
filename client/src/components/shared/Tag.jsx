import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import isFunction from 'lodash/isFunction';

const Tag = ({ className, value, autoFocus, onComplete }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (autoFocus) inputRef.current.focus();
  }, []);

  return (
    <div className={classNames('rounded-lg', className)}>
      <span
        ref={inputRef}
        className='text-white outline-none px-3 pt-1 pb-2 leading-none flex items-center justify-between'
        role='textbox'
        suppressContentEditableWarning
        contentEditable='true'
        spellCheck={false}
        onBlur={e => isFunction(onComplete) && onComplete(value, e)}>
        {value}
      </span>
    </div>
  );
};

Tag.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Tag;
