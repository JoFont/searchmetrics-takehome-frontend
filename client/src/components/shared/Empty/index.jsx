import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './empty-box.json';
import PropTypes from 'prop-types';

const Empty = ({ isPaused = false, isStopped = false, loop = true, className, title, subTitle }) => {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const containerAnimation = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const textAnimation = {
    hidden: {
      y: 50
    },
    show: {
      y: 0
    }
  };

  const iconAnimation = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1 }
  };

  return (
    <div className={classNames('flex items-center justify-start space-x-4', className)}>
      <motion.div
        initial='hidden'
        animate='show'
        variants={iconAnimation}
        transition={{ duration: 0.1, type: 'spring', velocity: 10, mass: 0.4, stiffness: 240 }}
        className='w-32'>
        <Lottie options={defaultOptions} isStopped={isStopped} isPaused={isPaused} loop={loop} />
      </motion.div>
      <motion.div variants={containerAnimation} initial='hidden' animate='show'>
        {title && (
          <motion.h3 variants={textAnimation} className='text-lg font-semibold leading-none'>
            {title}
          </motion.h3>
        )}
        {subTitle && <motion.h5 variants={textAnimation}>{subTitle}</motion.h5>}
      </motion.div>
    </div>
  );
};

Empty.propTypes = {
  isPaused: PropTypes.bool,
  isStopped: PropTypes.bool,
  loop: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default Empty;
