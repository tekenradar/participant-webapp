import { InternalNavigator } from 'case-web-app-core';
import { getExternalOrLocalContentURL } from 'case-web-ui';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [navigateTo, setNavigateTo] = useState<undefined | { url: string, replace: boolean }>();


  return (
    <header className="bg-secondary">
      <InternalNavigator
        navigateTo={navigateTo}
      />
      <div className='container'>
        <div className='d-flex p-2 pt-0'>
          <img
            onClick={() => setNavigateTo({ url: '/home', replace: true })}
            alt='Tekenradar Logo'
            src={getExternalOrLocalContentURL('/images/tekenradar-logo-cut.png')}
            height={75}
            className='cursor-pointer'
          />
        </div>
      </div>

    </header>
  );
};

export default Header;
