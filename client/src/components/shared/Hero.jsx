import React from 'react';
import '../../assets/styles/hero.css';

const Hero = props => {
  return (
    <div className='relative overflow-hidden w-full h-full flex flex-col items-center justify-center hero'>{props.children}</div>
  );
};

export default Hero;
