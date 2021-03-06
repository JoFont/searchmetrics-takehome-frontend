import classNames from 'classnames';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import React from 'react';
import { FiTrash } from 'react-icons/fi';
import PropTypes from 'prop-types';

const DeleteButton = ({ visible = true, className, style, onClick }) => {
  const buttonVariants = {
    show: { scale: 1, opacity: 1 },
    hidden: { scale: 0, opacity: 0 }
  };

  return (
    <motion.div
      className={classNames(
        'bg-red-400 hover:bg-red-600 w-8 h-8 rounded-full flex justify-center items-center shadow-md',
        className
      )}
      style={!isEmpty(style) && style}
      initial={buttonVariants.hidden}
      animate={visible ? 'show' : 'hidden'}
      variants={buttonVariants}
      transition={{ duration: 0.1, type: 'spring', velocity: 10, mass: 0.4, stiffness: 240 }}
      whileHover={{ rotate: 20 }}
      onClick={onClick}>
      <motion.div>
        <FiTrash className='text-white' />
      </motion.div>
    </motion.div>
  );
};

DeleteButton.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

export default DeleteButton;
