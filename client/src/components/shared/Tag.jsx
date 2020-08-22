import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useKey } from 'react-use';

const Tag = ({ className, value, removable, onTagRemove }) => {
  const [hover, setHover] = useState(false);

  const iconContainerAnimation = {
    open: { width: '1.5rem', opacity: 1 },
    closed: { width: '0rem', opacity: 0 }
  };

  return (
    <div
      className={classNames('rounded-lg border-solid border-2 border-transparent flex items-center', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <p className='text-white outline-none px-3 pt-1 pb-2 leading-none flex items-center justify-between'>{value}</p>
      {removable && (
        <motion.div
          animate={hover ? 'open' : 'closed'}
          variants={iconContainerAnimation}
          transition={{ duration: 0.15 }}
          onClick={e => onTagRemove(value, e)}
          whileHover={{ rotate: 15 }}
          className={classNames('flex justify-center items-center mr-1 text-white')}>
          <FiTrash />
        </motion.div>
      )}
    </div>
  );
};

Tag.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Tag;

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
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0, scaleX: 0 }}
      transition={{ duration: 0.1, type: 'spring', velocity: 10, mass: 0.3, stiffness: 240 }}
      className={classNames('rounded-lg border-solid border-2 border-transparent', error && 'border-red-600', className)}>
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
    </motion.div>
  );
};

InputTag.prototypes = {
  type: PropTypes.string,
  value: PropTypes.value,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFinishEditing: PropTypes.func,
  error: PropTypes.bool
};

Tag.InputTag = InputTag;
