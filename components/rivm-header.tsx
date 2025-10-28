import React from 'react';
import Image from "next/image";
import Container from './container';


const RivmHeader: React.FC = () => {
  return (
    <div>
      <div className="flex">
        <div className="mt-0" style={{
          marginLeft: "calc(50% - 22px)"
        }}>
          <Image
            src="/static/logo.svg"
            alt="Logo"
            width={44}
            height={24}
            priority
          />
        </div>
        <div className="ms-2 pb-4" style={{
          letterSpacing: "0.001em",
          width: '210px',
          paddingTop: 34,
        }}>
          <div className='font-serif text-[0.875rem] leading-[0.875rem]'>
            <div className=''>{'Rijksinstituut voor Volksgezondheid'}</div>
            <div className=''>{'en Milieu'}</div>
          </div>
          <div className='font-serif text-[0.875rem] leading-[0.875rem]'>
            <div className='italic'>{'Ministerie van Volksgezondheid,'}</div>
            <div className='italic '>{'Welzijn en Sport'}</div>
          </div>
        </div>


      </div>
      <div className='bg-secondary w-full text-xl py-1'>
        <Container className='space-x-1'>
          <span className='font-bold'>RIVM</span>
          <span>
            <span className='italic me-1'>De zorg voor morgen</span>
            begint vandaag
          </span>
        </Container>
      </div>
    </div >
  );
};

export default RivmHeader;
