import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = ({ type = 'text', value = '', placeholder = '', className, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = e => {
    setLocalValue(e.target.value);
    onChange(e.target.value, e);
  };

  console.log('RENDER', value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      value={localValue}
      className={classNames('px-2 py-1 leading-none outline-none rounded border-transparent focus:border-smetrics', className)}
    />
  );
};

TextInput.prototypes = {
  type: PropTypes.string,
  value: PropTypes.value,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default TextInput;
