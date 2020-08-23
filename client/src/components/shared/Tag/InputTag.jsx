import classNames from 'classnames';
import { motion } from 'framer-motion';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useClickAway, useKey } from 'react-use';

const InputTag = ({
  type = 'text',
  value = '',
  placeholder = '',
  className,
  inputClassName,
  onChange,
  onFinishEditing,
  error,
  focus,
  ...props
}) => {
  const inputRef = useRef();

  const handleFinish = type => isFunction(onFinishEditing) && onFinishEditing(type);

  useEffect(() => {
    console.log(value);
  }, [value]);

  useKey('Enter', () => handleFinish('Enter'));
  useKey('Tab', () => handleFinish('Tab'));
  useClickAway(inputRef, handleFinish);

  useEffect(() => {
    if (focus) inputRef.current.focus();
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
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  onChange: PropTypes.func,
  onFinishEditing: PropTypes.func,
  error: PropTypes.bool,
  focus: PropTypes.bool
};

export default InputTag;
