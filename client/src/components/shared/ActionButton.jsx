import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({ children, onClick }) => {
  return (
    <button
      className='px-6 py-3 rounded bg-smetrics text-sm font-semibold text-white hover:bg-black transition-colors duration-200 ease-in-out focus:outline-none'
      onClick={onClick}>
      {children}
    </button>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default ActionButton;
