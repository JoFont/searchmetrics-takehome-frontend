import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ className, value }) => {
  return (
    <div className={classNames('rounded-lg', className)}>
      <span
        className='text-white outline-none px-3 pt-1 pb-2 leading-none flex items-center justify-between'
        role='textbox'
        contenteditable='true'>
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
