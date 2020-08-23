import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Card = ({ children, className }) => {
  return <div className={classNames('w-full shadow-xl rounded-lg bg-white p-8', className)}>{children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Card;
