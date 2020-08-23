import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = ({ type = 'text', value = '', placeholder = '', className, onChange, focus, ...props }) => {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef();

  const handleChange = e => {
    setLocalValue(e.target.value);
    onChange(e.target.value, e);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    inputRef.current.focus();
  }, [focus]);

  return (
    <input
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      value={localValue}
      className={classNames('px-2 py-1 leading-none outline-none rounded border-solid border-transparent', className)}
      {...props}
    />
  );
};

TextInput.prototypes = {
  type: PropTypes.string,
  value: PropTypes.value,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  focus: PropTypes.bool
};

export default TextInput;
