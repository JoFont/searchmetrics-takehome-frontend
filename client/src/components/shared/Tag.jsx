import classNames from 'classnames';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { FiTrash } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useKey } from 'react-use';

const Tag = ({ className, value, removable, onTagRemove }) => {
  const [hover, setHover] = useState(false);
  const [trashHover, setTrashHover] = useState(false);

  const iconContainerAnimation = {
    open: { width: '1.5rem', opacity: 1 },
    closed: { width: '0rem', opacity: 0 }
  };

  useEffect(() => {
    console.log('HOVER');
  }, [hover]);

  return (
    <div
      className={classNames('rounded-lg border-solid border-2 border-transparent flex items-center', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <p className='text-white outline-none px-3 pt-1 pb-2 leading-none flex items-center justify-between'>{value}</p>
      {removable && (
        <motion.div
          animate={hover && removable ? 'open' : 'closed'}
          variants={iconContainerAnimation}
          transition={{ duration: 0.15 }}
          className='pr-2'
          onMouseEnter={() => setTrashHover(true)}
          onMouseLeave={() => setTrashHover(false)}
          onClick={e => onTagRemove(value, e)}>
          <FiTrash className={trashHover ? 'text-red-600' : 'text-white'} />
        </motion.div>
      )}
    </div>
  );
};

const InputTag = ({
  type = 'text',
  value = '',
  placeholder = '',
  className,
  inputClassName,
  onChange,
  onFinishEditing,
  error,
  ...props
}) => {
  const inputRef = useRef();

  const handleFinish = () => isFunction(onFinishEditing) && onFinishEditing(value);
  useKey('Enter', handleFinish);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={classNames('rounded-lg border-solid border-2 border-transparent', error && 'border-red-600', className)}>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value, e)}
        onBlur={handleFinish}
        value={value}
        className={classNames(
          'text-white bg-transparent outline-none px-3 pt-1 pb-1 leading-none flex items-center justify-between',
          inputClassName
        )}
        {...props}
      />
    </div>
  );
};

InputTag.prototypes = {
  type: PropTypes.string,
  value: PropTypes.value,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Tag.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Tag.InputTag = InputTag;

export default Tag;
