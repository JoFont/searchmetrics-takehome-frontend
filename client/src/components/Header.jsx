import React from 'react';
import Logo from './shared/Logo';

const Header = () => {
  return (
    <div className='w-full flex items-center h-6 justify-between'>
      <Logo />
      <div>
        <p className='font-light'>Frontend Challenge by Diogo Marques</p>
      </div>
    </div>
  );
};

export default Header;
