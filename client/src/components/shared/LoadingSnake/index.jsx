import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './snake.json';
import PropTypes from 'prop-types';

const LoadingSnake = ({ isPaused = false, isStopped = false, loop = true, className }) => {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={className}>
      <Lottie options={defaultOptions} isStopped={isStopped} isPaused={isPaused} loop={loop} />
    </div>
  );
};

LoadingSnake.propTypes = {
  isPaused: PropTypes.bool,
  isStopped: PropTypes.bool,
  loop: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingSnake;
