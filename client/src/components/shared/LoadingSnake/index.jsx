import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './snake.json';

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

export default LoadingSnake;
