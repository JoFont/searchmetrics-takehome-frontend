import { motion } from 'framer-motion';
import React from 'react';
import LoadingSnake from '../../shared/LoadingSnake';

const Loading = () => {
  return (
    <motion.div
      className='w-full flex justify-center items-center'
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.1 }}>
      <LoadingSnake className='w-48' />
    </motion.div>
  );
};

export default Loading;
