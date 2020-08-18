import React from 'react';
import '../../assets/styles/hero.css';
import PropTypes from 'prop-types';

const Hero = props => {
  return (
    <div className='relative overflow-hidden w-full h-full flex flex-col items-center justify-center hero'>{props.children}</div>
  );
};

Hero.propTypes = {
  children: PropTypes.node
};

export default Hero;
