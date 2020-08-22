import classNames from 'classnames';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import React from 'react';
import { FiTrash } from 'react-icons/fi';

const DeleteButton = ({ visible = true, className, style, onClick }) => {
  const buttonVariants = {
    visible: { scale: 1, opacity: 1 },
    hidden: { scale: 0, opacity: 0 }
  };

  return (
    <motion.div
      className={classNames(
        'bg-red-400 hover:bg-red-600 w-8 h-8 rounded-full flex justify-center items-center shadow-md',
        className
      )}
      style={!isEmpty(style) && style}
      animate={visible ? 'visible' : 'hidden'}
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

export default DeleteButton;
