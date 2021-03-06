import React from 'react';
import Logo from './shared/Logo';

const Header = () => {
  return (
    <div className='w-full flex items-center h-6 justify-between'>
      <Logo />
      <div>
        <p>
          Frontend Challenge by
          <a
            className='border-b-2 border-smetrics ml-1'
            href='https://github.com/JoFont'
            rel='noopener noreferrer'
            target='_blank'>
            Diogo Marques
          </a>
        </p>
      </div>
    </div>
  );
};

export default Header;
