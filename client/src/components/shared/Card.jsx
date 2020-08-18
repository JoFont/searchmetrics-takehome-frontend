import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Card = props => {
  return <div className={classNames('w-full shadow-xl rounded-lg p-8', props.className)}>{props.children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Card;
