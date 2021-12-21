import { getExternalOrLocalContentURL } from 'case-web-ui';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-secondary">
      <div className='container'>
        <div className='d-flex py-1'>
          <img
            alt='Tekenradar Logo'
            src={getExternalOrLocalContentURL('/images/tekenradar-logo-neu.png')}
            height={120}
          />
        </div>
      </div>

    </header>
  );
};

export default Header;
