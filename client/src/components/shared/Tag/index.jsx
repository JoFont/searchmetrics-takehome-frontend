import classNames from 'classnames';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';

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
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  removable: PropTypes.bool,
  onTagRemove: PropTypes.func
};

export default Tag;
