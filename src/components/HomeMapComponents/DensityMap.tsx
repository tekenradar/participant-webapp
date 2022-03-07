import { getExternalOrLocalContentURL } from 'case-web-ui';
import React from 'react';

interface DensityMapProps {
}

const DensityMap: React.FC<DensityMapProps> = (props) => {
  return (
    <div className='p-2'>
      <div className='row'>
        <div className='col-12 col-md-7'>
          <img
            width="100%"
            src={getExternalOrLocalContentURL('images/dichtheidkaart.png')}
            alt='Dichtheidkaart'
          />
        </div>
        <div className='col-12 col-md-5'>
          <h3>Dichtheid van tekenbeet meldingen</h3>
          <p>TODO: Some text about the map</p>
        </div>
      </div>
    </div>
  );
};

export default DensityMap;
