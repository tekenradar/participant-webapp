import { getExternalOrLocalContentURL } from 'case-web-ui';
import React from 'react';

interface DensityMapProps {
}

const DensityMap: React.FC<DensityMapProps> = (props) => {
  return (
    <div className='p-2'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <img
            width="100%"
            src={getExternalOrLocalContentURL('images/dichtheidkaart.png')}
            alt='Kaart van Nederland met de geografische spreiding van het aantal tekenbeten per vierkante kilometer'
          />
        </div>
        <div className='col-12 col-md-6'>
          <h3 className='mt-2 mt-md-0'>Tekenbeetdichtheid</h3>
          <p>Op deze kaart is te zien waar de meeste tekenbeten via Tekenradar gemeld worden. In deze gebieden zitten niet alleen veel teken, maar komen ook veel mensen.</p>
        </div>
      </div>
    </div>
  );
};

export default DensityMap;
